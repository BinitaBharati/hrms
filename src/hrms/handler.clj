(ns hrms.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]
			[ring.middleware.session :refer [wrap-session]]
			[clojure.java.io :as io]
			[hrms.views :as  views]
			[clojure.pprint  :refer [pprint]]
			[clojure.string :as str]
			[ring.middleware.params :refer [wrap-params]]
			[ring.middleware.content-type :refer [wrap-content-type]]
      [ring.middleware.json :refer [wrap-json-params wrap-json-response]]
   )
)

(defroutes app-routes
  (GET "/" request (views/getHome request))
  (POST "/hrms/login/" loginFormData (views/login loginFormData
  ))
  (POST "/hrms/add/employee" employeeFormData (views/addEmployee employeeFormData))
  (POST "/hrms/search/employee" employeeFormData (views/searchEmployee employeeFormData))
   (POST "/hrms/edit/employee" employeeFormData (views/editEmployee employeeFormData))
  (GET "/hrms/logout/" request (views/logout
                                 request))
  ;;server static files
  (route/resources "/")
  (route/not-found "Not Found"))

;; Refer : https://books.google.co.in/books?id=HA9QDwAAQBAJ&pg=PT110&lpg=PT110&dq=ring+apply+wrap-session+and+wrap-params+together&source=bl&ots=0O1UKEiN2M&sig=ACfU3U3KUK5p2hT6LHtpoY8MMnT56zj0sg&hl=en&sa=X&ved=2ahUKEwi_3smP8tvgAhUKso8KHVWLA54Q6AEwCHoECAIQAQ#v=onepage&q=ring%20apply%20wrap-session%20and%20wrap-params%20together&f=false
(def app
  (wrap-json-response (wrap-session (wrap-json-params (wrap-params  app-routes (assoc-in site-defaults [:security :anti-forgery] false)))))
  ;;Reference : https://github.com/ring-clojure/ring/wiki/Cookies
  ;;(wrap-defaults app-routes (assoc-in site-defaults [:security :anti-forgery] false))
)
