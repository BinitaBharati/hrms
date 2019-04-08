(defproject hrms "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :min-lein-version "2.0.0"
  :dependencies [[org.clojure/clojure "1.10.1-beta1"]
                 [compojure "1.6.1"]
                 [ring/ring-defaults "0.3.2"]
				 [org.clojure/java.jdbc "0.7.9"]
				 [org.xerial/sqlite-jdbc "3.25.2"]
         [ring/ring-json "0.4.0"]
				 ]
  :plugins [[lein-ring "0.12.5"]]
  :ring {:handler hrms.handler/app}
  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring/ring-mock "0.3.2"]
						[de.ubercode.clostache/clostache "1.4.0"]]}})

;;lein ring server-headless
