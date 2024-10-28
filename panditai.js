// Load the Teachable Machine model
let model;
async function loadModel() {
  model = await tmImage.load('model/model.json', 'model/metadata.json');
  console.log("Model Loaded Successfully");
}

// Function to make predictions
async function predictImage(imageElement) {
  const predictions = await model.predict(imageElement);
  predictions.sort((a, b) => b.probability - a.probability); // Sort predictions by probability
  displayPrediction(predictions[0]); // Show the highest prediction
}

// Display the prediction result
function displayPrediction(prediction) {
  const resultDiv = document.getElementById('predictionResult');
  resultDiv.textContent = `Prediction: ${prediction.className} with ${Math.round(prediction.probability * 100)}% confidence`;
  
}

// Image upload and prediction process
document.getElementById('imageUpload').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      predictImage(img);
      URL.revokeObjectURL(img.src); // Clean up
    };
  }
});



// Load model on page load
loadModel();


