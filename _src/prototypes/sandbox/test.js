console.log('hello har');


let obj;

function processParsedFile(data) {
  obj = data;
  console.log(obj);
}

function processInput(input) {

  const file = input;
  let reader = new FileReader();

  reader.onload = (e) => {
    let parsed = JSON.parse(e.target.result);

    try {
      // ///// FIXME: Add case for safari
      // switch(true) {
      //   case Object.keys(parsed).includes('fileType') || Object.keys(parsed).includes('systemClient'):
      //     throw "you're throwing FF at us"
      //     break;
      //   case !parsed.some(el => el.args.snapshot !== undefined && typeof el.args.snapshot === 'string'):
      //     throw "⚠️ The file doesn't appear to be a performance trace from Chrome – or it doesn't contain any screenshots";
      //     break;
      // }

      console.log(`Loaded file: ${file.name}`);
      console.log(`File size: ${file.size}`);
      console.log(`File type: ${file.type}`);

      processParsedFile(parsed);

      document.getElementById('dropped-filename').textContent = file.name;
      document.getElementById('results').classList.add('visible');
      document.getElementById('landing').classList.add('landed');

    } catch (err) {
      console.log(err);
      // createNewNotif(err);
    }
  }
  reader.readAsText(file);
}

function handleDragEnter(e) {
  e.stopPropagation();
  e.preventDefault();
  console.log(e.type);
  e.dataTransfer.dropEffect = "move";
  e.target.classList.add('dragover');
}

function handleDragOver(e) {
  e.stopPropagation();
  e.preventDefault();
  console.log(e.type);
}

function handleDragLeave(e) {
  e.preventDefault();
  e.stopPropagation();
  console.log(e.type);

  e.target.classList.remove('dragover');
}

function handleDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  console.log(e.type);
  e.target.classList.remove('dragover');

  processInput(e.dataTransfer.files[0]);
}


const input = document.getElementById('input'),
  droptzone = document.getElementById('dropzone');

input.addEventListener('change', e => processInput(e.target.files[0]));
dropzone.addEventListener('dragenter', e => handleDragEnter(e));
dropzone.addEventListener('dragover', e => handleDragOver(e));
dropzone.addEventListener('dragleave', e => handleDragLeave(e));
dropzone.addEventListener('drop', e => handleDrop(e));




// fetch('/data/2022-02-24-checkout.har')
//   .then(response => response.json())
//   .then(parsed => {
//     console.log(parsed);
//     // obj = parsed;
//     // snapshots = obj.map(el => el.args.snapshot).filter(i => i !== undefined && typeof i === 'string');
//     // console.log(snapshots);
//     // slider.max = snapshots.length - 1;
//     // updateImage(snapshots[0]);
//   })
//   .catch(err => console.log(err));