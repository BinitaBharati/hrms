(ns hrms.handler-test
  (:require [clojure.test :refer :all]
            [ring.mock.request :as mock]
            [hrms.handler :refer :all]
			[hrms.dbutil :as dbutil]))



(deftest createSchema
     (dbutil/createSchema "EMPLOYEE")
)

(deftest testCreatedSchema
     (dbutil/testCreatedSchema "USER")
)

;;To test only a partciular test case : lein test :only hrms.handler-test/testLogin
(deftest testLogin
	(dbutil/login {:inputEmail "carlos@skytel.com" :inputPassword "dumb"})
)

(deftest testEmployeeExists
     (dbutil/testEmployeeExists {:org "ABA" :firstName "mumu" :lastName "lima"})
)