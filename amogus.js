window.addEventListener('keydown', (e) => {
	const { key, altKey } = e;
	if (key === 'F4' && altKey) {
		playboom();
	    }
    });

function playboom() {
    var audio = document.getElementById('boom');
	audio.play();
};

window.addEventListener('keydown', (e) => {
	const { key, altKey } = e;
	if (key === 'I' && altKey && ctrlKey) {
        e.preventDefault();
		playboom();
	    }
    });

 window.addEventListener('keydown', (e) => {
    const { key, altKey } = e;
    if (key === 'C' && altKey && ctrlKey) {
        e.preventDefault();
        playboom();
        }
    });

    document.onkeydown = function(e) {
        if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
            playboom();
            return false;
        }
    };
    document.onkeydown = function(e) {
        if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
            playboom();
            return false;
        }
    };