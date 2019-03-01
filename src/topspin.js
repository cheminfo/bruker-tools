if(!this.button) return;
var plate = API.getData('plateGrid');
var range = API.getData('range');
var selectedPlate = String(API.getData('selectedPlate'));
var plateNumber = Number(API.getData('plateNumber'));


if(!(plateNumber+1)) {
    ui.showNotification('No plate number given');
    return;
}

plate = plate.filter(function(val) {
    return val.selected;
});
var len = plate.length;

plate = plate.filter(function(val) {
    return val.ref && val.batch
});

if(plate.length !== len) {
    ui.showNotification('Ignoring ' + (len - plate.length) + ' orphelin plates', 'warn');
}


if(this.button === 'preview') {
   var experience = generateTopSpinFile(plate);
   ui.showCode({
       mode: 'text',
       content: experience
   });
} else if(this.button === 'previewJSON') {
    var experience = generateRequests(plate);
    ui.showCode({
        mode: 'json',
        content: JSON.stringify(experience, null, '\t')
    })
} else if(this.button === 'download') {
    fileSaver(new Blob([generateTopSpinFile(plate)], {type: 'application/json'}), moment().format('YYYY-MM-DD-hh-mm-ss') + '.txt');
}

function generateRequests(plate) {
    var exp = plate.map(function(p) {
        return {
            name: selectedPlate,
            plateNumber: plateNumber,
            user: 'nmrsu',
            title: 'ref: ' + p.ref + '\\nbatch: ' + p.batch,
            position: p.label,
            experiments: [{
                "experiment": "N PROF_URINE_NOESY",
                "solvent": "urine",
                "parameters": []
              },
              {
                "experiment": "N PROF_URINE_JRES",
                "solvent": "urine",
                "parameters": []
              }
            ]
        }
    });
    return exp;
}



function generateTopSpinFile (wells) {
    var requests=generateRequests(wells);
    var options={
        plateNumber: plateNumber,
        deleteExistingHolder: false
    };
    return Screening.IconNMR.generateFile(requests, options);
}

