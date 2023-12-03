# LauzHack2023
Amazon Review Tools - by Ali S., Alberto L. and Lorenzo C.

## BRIEF DESCRIPTION
Our project is designed to offer Amazon sellers an accessible and immediate interface for summarizing user reviews ¬on ¬specific products. 
The main goal of this interface is to identify the most pressing issues associated with a selected product, significantly simplifying the reading of reviews. 
This streamlined approach lets sellers make simpler impactful decisions to enhance the overall customer experience. 

## INSPIRATION 
Each day the world of e-commerce is flooded with millions of feedbacks. We believe there’s a practical way to avoid drowning in them.
When you decide to inspect a product, it shouldn’t take more than a couple of minutes to understand the harshest complaints or its most appreciated features. 
With this in mind, we designed an efficient algorithm and an especially user-friendly environment to make this a reality. 
For the scope the hackathon we agreed to focus on making the tools for checking the reviews of a single product at a time.

## WHAT IT DOES
Our solution can allow companies selling on amazon to have an easy way to take care of the customer reviews of a product of their choice. 
The interface transmits highly concentrated information through a pie chart that divides customer reviews in a few categories chosen by our algorithm. 
In this way it is immediate to spot what the majority of the feedback focuses on. 
Moreover, each slice of the pie chart is colour based on the percentage of positivity of reviews in that category coming from a sentiment analysis.

## CHALLENGES WE RAN INTO
-	Limited use of LLM credits
-	Cut in production features (LDA)
-	Computational times 

## ACCOMPLISHMENTS THAT WE’RE PROUD OF
Working demo (back-end and front-end implementation)

## WHAT WE LEARNED


## HOW WE BUILT IT
We paired id to reviews,
used text2vec, 
used PCA to “standardize”, 
clustered the vectors through k means (silhouette method to choose optimal k).
Split the vectors in 5 macro-categories. We identified the sub-categories of clusters (lemmatization). 
We also differentiated the data based on a sentiment analysis (NLTK with vader lexicon).


## WHAT’S NEXT FOR "AMAZON REVIEW TOOLS"
-	Simultaneous multiple product checking
-	Increase of accuracy 
-	Amazon-like UI (seller and vendor)

## CODE STRUCTURE
```apiserver```: Serves the csv data to the frontend app
```aws-review```: frontend app written in nextjs
