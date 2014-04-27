LOG("loading quneo.ctlmap.js");

load('iCtlMap.js');

load('pageset.ctl.js');
load('padgrid.ctl.js');
load('shiftbtn.ctl.js');
load('transport.ctl.js');
load('mixer.ctl.js');

QuneoCtlMap.prototype = new iCtlMap;
QuneoCtlMap.prototype.constructor = QuneoCtlMap;

function QuneoCtlMap() {

	this.pads = new PadGrid(16);
	this.pads.setNoteArray([36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51]);

	this.pageset = new PageSet(4);
	this.pageset.setNoteArray([19, 20, 21, 22]);

	this.shiftbtn = new ShiftBtn(1);
	this.shiftbtn.setNote(0, 18);

	this.transport = new Transport(3);
	this.transport.setNoteArray([24, 25, 23]);

	this.mixer = new Mixer(4);
	this.mixer.setCCArray([0, 1, 2, 3]);


}


iCtlMap.prototype.NoteOn = function(note_val, velocity) {
	if(this.pads.getNoteIndex(note_val) >= 0) {
		var ctl_index = this.pads.noteOn(note_val, velocity);
		LOG("Pad" + ctl_index + ": On - Pad: " + this.pads.getNoteIndex(note_val));
	} else if(this.pageset.getNoteIndex(note_val) >= 0) {
		var ctl_index = this.pageset.noteOn(note_val, velocity);
		LOG("Page" + ctl_index + ": On - Page: " + this.pageset.getPage());

	} else if(this.shiftbtn.getNoteIndex(note_val) >= 0) {
		var ctl_index = this.shiftbtn.noteOn(note_val, velocity);
		LOG("Shift" + ctl_index + ": On - Shifted: " + this.shiftbtn.getState());

	} else if(this.transport.getNoteIndex(note_val) >= 0) {
		var ctl_index = this.transport.noteOn(note_val, velocity);
		LOG("Transport " + ctl_index + ": On - Control: " + this.transport.getNoteIndex(note_val));

	}

  return null;
};

iCtlMap.prototype.CCUpdate = function(cc_in, value) {
	if(this.mixer.getCCIndex(cc_in) >= 0) {
		var ctl_index = this.mixer.updateCC(cc_in, value);
		LOG("Mixer" + ctl_index + ": " + this.mixer.getCtlValue(ctl_index));

	}

}

/*
iCtlMap.prototype.NoteOff = function(note_val) {
		if(this.pads.getCtlIndex(note_val)) {
			LOG("Pad" + this.pads.ctlIndex(note_val) + ": Off");

		} else if(this.pageset.getCtlIndex(note_val)) {
			LOG("Page" + this.pageset.ctlIndex(note_val) + ": Off");

		} else if(this.shiftbtn.getCtlIndex(note_val)) {
			LOG("Shift" + this.pageset.ctlIndex(note_val) + ": Off");
		}
  return null;
}
*/

/*
iCtlMap.prototype.hasPads = function() {
  return 16;
}
*/

iCtlMap.prototype.hasPages = function() {
  return 4;
};

iCtlMap.prototype.hasShift = function() {
  return 1;
};






LOG("quneo.ctlmap.js loaded");


