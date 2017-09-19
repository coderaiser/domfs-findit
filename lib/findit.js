'use strict';

const Emitify = require('emitify/legacy');

module.exports = (entry) => {
    const emitter = Emitify();
    
    setTimeout(() => {
        FindIt(emitter, entry);
    }, 0);
    
    return emitter;
};

function FindIt(emitter, entry) {
    if (!(this instanceof FindIt))
        return new FindIt(emitter, entry);
    
    this._dirs  = 0;
    this._first = true;
    
    this._find(emitter, entry);
}

FindIt.prototype._find = function(emitter, entry) {
    if (entry.isFile) {
        emitter.emit('file', entry.fullPath, entry);
        
        if (this._first)
            emitter.emit('end');
        
        return;
    }
    
    if (this._first)
        this._first = false;
    
    emitter.emit('directory', entry.fullPath, entry);
    
    ++this._dirs;
    
    entry.createReader()
        .readEntries((entries) => {
            [].forEach.call(entries, (entry) => {
                this._find(emitter, entry);
            });
            
            --this._dirs;
            
            if (!this._dirs)
                emitter.emit('end');
        });
};

