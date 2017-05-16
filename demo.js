
function Bayes() {
  this.features = {}
  this.categories = {}
}

Bayes.prototype.getScore = function(category, features) {
  score = Math.log(this.getPrior(category))

  for(var feature of features) {
    score += Math.log(this.getProbability(feature, category))
  }

  return score
}

Bayes.prototype.getPrior = function(category) {
  return (this.categories[category] || 0.1) / this.totalDocuments
}

Bayes.prototype.getProbability = function(feature, category) {
  return (this.features[category][feature] || 0.1) / this.categories[category]
}

Bayes.prototype.classify = function(features) {
  let maxClass = null
  let maxScore = -Infinity
  for (var category in this.categories) {
    const score = this.getScore(category, features)
    if (score > maxScore) {
      maxClass = category
      maxScore = score
    }
  }
  return maxClass
}

Bayes.prototype.incrementTotal = function(category) {
  this.totalDocuments = (this.totalDocuments || 0) + 1
}

Bayes.prototype.incrementCategory = function(category) {
  this.categories[category] = (this.categories[category] || 0) + 1
}

Bayes.prototype.incrementFeature = function(feature, category) {
  if (!this.features[category]) {
    this.features[category] = {}
  }
  this.features[category][feature] = (this.features[category][feature] || 0) + 1
}

Bayes.prototype.train = function(category, features) {
  this.incrementTotal()
  this.incrementCategory(category)
  for (var feature of features) {
    this.incrementFeature(feature, category)
  }
}

b = new Bayes()

b.train('city', ['subway', 'tower', 'hotel'])
b.train('city', ['opera', 'tower', 'hotel'])
b.train('city', ['opera', 'subway', 'hotel'])

b.train('country', ['cow', 'field', 'hill'])
b.train('country', ['cow', 'field', 'farm'])

// city
console.log(b.classify(['subway', 'hill', 'tower']))

// country
console.log(b.classify(['farm', 'hill', 'sheep']))
