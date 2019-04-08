(ns hrms.templates
	(:require 	
				[net.cgrand.enlive-html :as html]

	)
)

(deftemplate loginform-template "net/cgrand/enlive_html/example.html"
 [title posts]
   [:title] (content title)
   [:h1] (content title)
   [:div.no-msg] (if (empty? posts)
                   identity
                   (substitute nil))
   [:div.post] (clone-for [{:keys [title body]} posts]
                          [:h2 :a] (content title)
                          [:p] (content body))
   [[:a (attr? :href)]] (set-attr :title "it's a link"))