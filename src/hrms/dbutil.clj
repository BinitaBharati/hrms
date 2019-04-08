(ns hrms.dbutil
	(:require 	[clojure.java.jdbc :as sql])
  (:import (java.text SimpleDateFormat) (java.util Date)))


(defn echo-> [x] (println "->" x) x)


(def db-spec {:classname   "org.sqlite.JDBC", :subprotocol "sqlite", :subname "hrms.db", :auto-commit? true})


(defn login [loginFormData]
	(let [queryStr (str "SELECT first_name, last_name, email, password FROM user WHERE email = '" (:inputEmail loginFormData) "' AND password = '" (:inputPassword loginFormData)  "'" )
		 result ( -> (sql/query  db-spec [queryStr]);;output is a clojure.lang.LazySeq sql/query should only be used where return results are expected
					 (first)
				)
		 ]
		(prn "queryStr is " queryStr)		
		(prn "result is " result)
		;;(result);;if result is nil, java.lang.NullPointerException: null is thrown		
		(if (not= nil result)
			result
			(str "USER NOT FOUND"))))

(defn assignDateEpoch [dateValStr]
  (if (not= "" dateValStr)
    (.getTime (.parse (SimpleDateFormat. "EEE MMM dd yyyy") dateValStr))
    nil))

(defn convertEpochToDate [epochDate]
  (if (not= nil epochDate)
    (.format (SimpleDateFormat. "EEE MMM dd yyyy") (Date. epochDate))
    nil))

(defn transformDate [output]
  (if (not= nil output)
    (.format (SimpleDateFormat. "EEE MMM dd yyyy") (Date. output))
    nil))


(defn addEmployee [params]
	(let [alias (get params "alias")
        org (get params "org")
        firstName (get params "firstName")
        doj (get params "doj")
        dojEpoch (assignDateEpoch doj)
        ;;dojEpoch (.getTime (.parse (SimpleDateFormat. "EEE MMM dd yyyy") doj))
        dob (get params "dob")
        dobEpoch (assignDateEpoch dob)
        ;;dobEpoch (.getTime (.parse (SimpleDateFormat. "EEE MMM dd yyyy") dob))
        insertStmnt "insert INTO EMPLOYEE (alias, organisation, first_name, last_name, address, city, state, country, dob, doj)
                    values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"]
 
        (prn "alias " alias "org " org   "firstName " firstName ", doj " doj ", dojEpoch " dojEpoch ", dob " dob ", dobEpoch " dobEpoch)
        
        (sql/execute! db-spec [insertStmnt (get params "alias") (get params "org") (get params "firstName") (get params "lastName")
                                           (get params "address") (get params "city") (get params "state") (get params "country")
                                           dobEpoch dojEpoch] )))

(defn mapResult [eachResultItem columnName]
     (prn "mapREsult entered with "eachResultItem " and col name " columnName)

 (cond 
   (not= nil (get eachResultItem columnName))
   (assoc eachResultItem columnName (transformDate (get eachResultItem columnName)))
    :else (assoc eachResultItem columnName "")))

(defn searchEmployee [params]
	(let [alias (get params "alias")
        org (get params "org")
        firstName (get params "firstName")
        lastName (get params "lastName")
        queryStr "SELECT alias, organisation, first_name, last_name, address, city, state, country, dob, doj FROM EMPLOYEE "
		    result ( -> (sql/query  db-spec [queryStr]);;output is a clojure.lang.LazySeq sql/query should only be used where return results are expected
					 (first)
				)]
  
		(prn "queryStr is " queryStr)		
		(if (not= nil org); org is mandatory from UI  
    (do (cond
          (not= nil alias); if lias is provided then only org and alias is enough to get results
          (do (let [queryStr1 (str queryStr " WHERE organisation = ? and alias = ?")
                 result  (sql/query  db-spec [queryStr1 org alias]);;output is a clojure.lang.LazySeq sql/query should only be used where return results are expected
                 resCount (count result)
                 output (take resCount result)
                 outputType (type output)
                 ]
                 (prn "output is " output)
                 ;;convert epoch dates to date string
                 (prn "outputType = " outputType)
                 (->> output
                   (map (fn [x]
                          (prn x)
                          (let [mappedResult (mapResult x :dob)]
                            (prn "mappedResult = "mappedResult)
                            mappedResult)))
                   (map (fn [x]
                          (prn "y is" x)
                          (mapResult x :doj) ))
                   )
             ))
          (and (not= nil firstName) (not= nil lastName))             
              (do 
                (prn "both firstName and lastName is provided")
                (let [queryStr1 (str queryStr " WHERE organisation = ? and first_name = ? and last_name = ?")
                 result  (sql/query  db-spec [queryStr1 org firstName lastName]);;output is a clojure.lang.LazySeq sql/query should only be used where return results are expected
                 resCount (count result)
                 output (take resCount result)
                 ]
                 (prn "output is " output)
                 (->> output
                   (map (fn [x]
                          (prn x)
                          (let [mappedResult (mapResult x :dob)]
                            (prn "mappedResult = "mappedResult)
                            mappedResult)))
                   (map (fn [x]
                          (prn "y is" x)
                          (mapResult x :doj) ))
                   )
             ))
          (not= nil firstName)
           (do 
             (prn "firstName is provided")
             (let [queryStr1 (str queryStr " WHERE organisation = ? and first_name = ?")
                  result  (sql/query  db-spec [queryStr1 org firstName]);;output is a clojure.lang.LazySeq sql/query should only be used where return results are expected
                  resCount (count result)
                  output (take resCount result)
                 ]
                 (prn "output is " output)
                 (->> output
                   (map (fn [x]
                          (prn x)
                          (let [mappedResult (mapResult x :dob)]
                            (prn "mappedResult = "mappedResult)
                            mappedResult)))
                   (map (fn [x]
                          (prn "y is" x)
                          (mapResult x :doj) ))
                   )
             ))
           (not= nil lastName)
           (do 
             (prn "lastName is provided")
             (let [queryStr1 (str queryStr " WHERE organisation = ? and last_name = ?")
                  result  (sql/query  db-spec [queryStr1 org lastName]);;output is a clojure.lang.LazySeq sql/query should only be used where return results are expected
                  resCount (count result)
                  output (take resCount result)
                 ]                
                 (prn "output is " output)
                 (->> output
                   (map (fn [x]
                          (prn x)
                          (let [mappedResult (mapResult x :dob)]
                            (prn "mappedResult = "mappedResult)
                            mappedResult)))
                   (map (fn [x]
                          (prn "y is" x)
                          (mapResult x :doj) ))
                   )
             ))))
			
   )))

(defn editEmployee [params]
	(let [alias (get params "alias")
        org (get params "org")
        doj (get params "doj")
        dojEpoch (assignDateEpoch doj)
        ;;dojEpoch (.getTime (.parse (SimpleDateFormat. "EEE MMM dd yyyy") doj))
        dob (get params "dob")
        dobEpoch (assignDateEpoch dob)
        ;;dobEpoch (.getTime (.parse (SimpleDateFormat. "EEE MMM dd yyyy") dob))
        updateStmnt "update EMPLOYEE set address = ?, city = ?, state = ?, country = ?, dob = ? , doj = ? where alias = ? and organisation = ?"]
   
   
 
        (prn "alias " alias "org " org  " doj " doj ", dojEpoch " dojEpoch ", dob " dob ", dobEpoch " dobEpoch)
        
        (sql/execute! db-spec [updateStmnt (get params "address") (get params "city") (get params "state") (get params "country")
                                           dobEpoch dojEpoch (get params "alias") (get params "org")] )))


(defn createSchema [input] 
;;Clojure does not have elseif, use cond to achieve same effect
;;https://clojurebridge.org/community-docs/docs/clojure/cond/
(cond 
  (= input "USER")
  (do (let [tableExistsCount ( -> (sql/query  db-spec ["SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name='user'"]);;output is a clojure.lang.LazySeq sql/query should only be used where return results are expected
                               (first)
                               (:count))]
        (prn "tableExistsCount " tableExistsCount)
        (if (= 0 tableExistsCount)
					                  ;;use sql/execute! when you dont expect any response barring runtime exceptions.
						     (do (sql/execute!  db-spec ["CREATE TABLE user (           
												     user_id INTEGER PRIMARY KEY,
												     first_name TEXT NOT NULL,
												     last_name TEXT NOT NULL,
												     email text NOT NULL UNIQUE,
												     password text NOT NULL)"])
						                 (sql/execute!  db-spec ["INSERT INTO user (user_id, first_name, last_name, email, password) values (1, 'Carlos', 'Delmonte', 'carlos@skytel.com', 'dumb')"])
						                 (sql/execute!  db-spec ["INSERT INTO user (user_id, first_name, last_name, email, password) values (2, 'Amanda', 'Reign', 'amanda@skytel.com', 'dumb')"])
						                 (sql/execute!  db-spec ["INSERT INTO user (user_id, first_name, last_name, email, password) values (3, 'Rajdeep', 'Guha', 'rguha@skytel.com', 'dumb')"])
						                 (sql/execute!  db-spec ["INSERT INTO user (user_id, first_name, last_name, email, password) values (4, 'Diya', 'Gowda', 'diyag@skytel.com', 'dumb')"]) 
                  )  						
	           )	
            )
          )
    (= input "EMPLOYEE")
         (
           do (let [tableExistsCount ( -> (sql/query  db-spec ["SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name='employee'"]);;output is a clojure.lang.LazySeq sql/query should only be used where return results are expected
						(first)
								(:count))]
	           (prn "tableExistsCount " tableExistsCount)
	           (if (= 0 tableExistsCount)
                  ;;use sql/execute! when you dont expect any response barring runtime exceptions.
	              (do (sql/execute!  db-spec ["CREATE TABLE employee (           
							     employee_id INTEGER PRIMARY KEY AUTOINCREMENT,
							     first_name TEXT,
							     last_name TEXT,
							     alias text NOT NULL,
							     organisation text NOT NULL,
                   dob integer,
                   doj integer,
                   address text,
                   city text,
                   state text,
                   country text, UNIQUE(alias, organisation) ON CONFLICT FAIL)"])
	                 ;;(sql/execute!  db-spec ["INSERT INTO user (user_id, first_name, last_name, email, password) values (1, 'Carlos', 'Delmonte', 'carlos@skytel.com', 'dumb')"])
	               ;;(sql/execute!  db-spec ["INSERT INTO user (user_id, first_name, last_name, email, password) values (2, 'Amanda', 'Reign', 'amanda@skytel.com', 'dumb')"])
                )  						
	           )	
            )
          )
    
)
  

)


(defn testCreatedSchema [input]
	(-> 
	(sql/query  db-spec [(str "SELECT count(*) as count FROM " input)])
	(first)
	(:count)
	(prn " is the total no of rows of users")
	)
)

(defn testEmployeeExists [input]
	(let [result (sql/query  db-spec ["SELECT organisation, alias, first_name, last_name from EMPLOYEE where organisation = ? and first_name = ? and last_name = ? " (:org input) (:firstName input) (:lastName input)])
	]
   (prn result))
	
	
)