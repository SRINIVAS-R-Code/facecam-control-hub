import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modelsDir = path.join(__dirname, 'public', 'models');

// Create models directory if it doesn't exist
if (!fs.existsSync(modelsDir)) {
  fs.mkdirSync(modelsDir, { recursive: true });
}

const modelFiles = [
  'tiny_face_detector_model-weights_manifest.json',
  'tiny_face_detector_model-shard1',
  'face_landmark_68_model-weights_manifest.json',
  'face_landmark_68_model-shard1',
  'face_recognition_model-weights_manifest.json',
  'face_recognition_model-shard1',
  'face_expression_model-weights_manifest.json',
  'face_expression_model-shard1'
];

const baseUrl = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/';

function downloadFile(filename) {
  return new Promise((resolve, reject) => {
    const url = baseUrl + filename;
    const filePath = path.join(modelsDir, filename);

    console.log(`Downloading ${filename}...`);

    const file = fs.createWriteStream(filePath);
    const request = https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded ${filename}`);
        resolve();
      });
    });

    request.on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file on error
      reject(err);
    });

    file.on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file on error
      reject(err);
    });
  });
}

async function downloadAllModels() {
  console.log('🚀 Starting face-api.js model download...');
  console.log(`📁 Models will be saved to: ${modelsDir}`);

  try {
    for (const filename of modelFiles) {
      await downloadFile(filename);
    }

    console.log('\n🎉 All face-api.js models downloaded successfully!');
    console.log('📋 Files downloaded:');
    modelFiles.forEach(file => console.log(`   - ${file}`));
    console.log('\n🔄 Refresh your browser to enable real facial landmark detection!');

  } catch (error) {
    console.error('❌ Error downloading models:', error.message);
    process.exit(1);
  }
}

downloadAllModels();