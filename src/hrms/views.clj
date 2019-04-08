(ns hrms.views
	(:require 	[clojure.java.io :as io]
				[clojure.pprint  :refer [pprint]]
				[ring.util.response :refer [response resource-response content-type]]
				[clostache.parser :refer [render-resource]]
				[hrms.dbutil :as dbutil]
        [clojure.stacktrace :as cljst]

	)
)

(defn echo-> [x] (println "->" x) x)

(defn getHome2 [request]
   (prn "request is " request)
   (let [session (:session request)
         count   (:count session 0)
         session (assoc session :count (inc count))]
    (-> (str "You accessed this page " count " times.")
	    (response)
		(echo->)
        (assoc :session session)
		(echo->))))
		
(defn getHome [request]
   (prn "request is " request)
   (let [session (:session request)
         userEmail   (:email session nil)]
     (prn "userEmail is "userEmail)
     (if (= userEmail nil)
         (render-resource "public/templates/login.mustache");;clostache rendering
         ;;else
         {:status 200
         :headers {"Content-Type" "text/html"}
         :body  (slurp (io/resource "public/test.html"))
         }
      )
    )
 )
 
   
;;Ref: https://github.com/ring-clojure/ring/wiki/Creating-responses
(defn login2 [request]
  (prn "login: entered with " request)
  (let [params        (:params request)
        inputEmail    (:inputEmail params)
        inputPassword (:inputPassword params)
        loginResult   (dbutil/login {:inputEmail inputEmail :inputPassword inputPassword})		
        cookies       (:cookies request)
        loginResultTypeClassName (.getName (type loginResult))]
    (prn "output final3333 is "loginResult)
    (prn "loginResultTypeClassName111 = " loginResultTypeClassName)
    (if (not= loginResultTypeClassName "java.lang.String");;means a user with same provided emailId and password was found in DB.
      (do
        {:status 200
         :headers {"Content-Type" "text/html"}
         :body  (slurp (io/resource "public/test.html"))
         :cookies {"userCreds" {:value (str (:email loginResult) ";" (:first_name loginResult) ";" (:last_name loginResult)) :path "/"  } }}
       );;end do
      ;;else part
      {:status 200
       :headers {"Content-Type" "text/html"}
       :body "You have entered incorrect credentials"
       })))


;;Ref: https://github.com/ring-clojure/ring/wiki/Creating-responses
(defn login [request]
  (prn "login: entered with " request)
  (let [params        (:params request)
        inputEmail    (get params "inputEmail")
        inputPassword (get params "inputPassword")
        loginResult   (dbutil/login {:inputEmail inputEmail :inputPassword inputPassword})		        
        session (:session request)
        loginResultTypeClassName (.getName (type loginResult))]
    (if (not= loginResultTypeClassName "java.lang.String");;means a user with same provided emailId and password was found in DB.
      (do
        {:status 200
         :headers {"Content-Type" "text/html"}
         :body  (slurp (io/resource "public/test.html"))
         :session (assoc session :email (:email loginResult) :first_name  (:first_name loginResult) :last_name (:last_name loginResult)) ;;to be used by server side template - clostache 
         :cookies {"userCreds" {:value (str "email=" (:email loginResult) ";" "firstName=" (:first_name loginResult) ";" "lastName=" (:last_name loginResult))  :path "/"} };;to be used by javacsript
         }
       );;end do
      ;;else part
      {:status 200
       :headers {"Content-Type" "text/html"}
       :body "You have entered incorrect credentials"
       })))

(defn logout [request]
   (prn "logout: request is " request)
   (let [session (:session request nil)
         cookies   (:cookies request nil)]
     (prn "session is "session)
     (prn "cookies is "cookies)
     
     
     (prn "updated session "session)
     (prn "updated cookies "cookies)
      ;;(render-resource "public/templates/login.mustache");;clostache rendering
      {:status 200
         :headers {"Content-Type" "text/html"}
         :body  (render-resource "public/templates/login.mustache")
         :session nil
         :cookies nil
      }
      )
   )

(defn addEmployee [request]
     (prn "addEmployee: entered with " request)
     (let [params (:params request)
           responseJson {:status 200
                         :headers {"Content-Type" "application/json"}}]
     (try (dbutil/addEmployee params)  
       {:status 200
        :headers {"Content-Type" "application/json"}
        :body {:msg "Add employee succeeded"}
        }
       
     (catch Exception e
       (prn (.getMessage e))
       {:status 500
        :headers {"Content-Type" "application/json"}
        :body {:msg (str "Add employee failed : " (.toString  e) )}
        } )
     )
     
))

(defn searchEmployee [request]
     (prn "searchEmployee: entered with " request)
     (try 
       (let [params (:params request)
           responseJson {:status 200
                         :headers {"Content-Type" "application/json"}}
           matchedEmployees (dbutil/searchEmployee params)  ]     
		
		       {:status 200
		        :headers {"Content-Type" "application/json"}
		        :body {:matchedEmployees matchedEmployees}
		        })
       (catch Exception e
		       (prn (.getMessage e))
		       {:status 500
		        :headers {"Content-Type" "application/json"}
		        :body {:msg (str "Search employee failed : " (.toString  e) )}
		        } )))


(defn editEmployee [request]
     (prn "editEmployee: entered with " request)
     (let [params (:params request)
           responseJson {:status 200
                         :headers {"Content-Type" "application/json"}}]
     (try (dbutil/editEmployee params)  
       {:status 200
        :headers {"Content-Type" "application/json"}
        :body {:msg "Edit employee succeeded"}
        }
       
     (catch Exception e
       ;;(prn (.getMessage e))
       (.printStackTrace  e)
       {:status 500
        :headers {"Content-Type" "application/json"}
        :body {:msg (str "Edit employee failed : " (.toString  e) )}
        } )
     )
     
))
