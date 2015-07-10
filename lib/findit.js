/* global Emitify */

(function(global) {
    'use strict';
    
    if (typeof module !== 'undefined' && module.exports)
        module.exports  = new FindIt();
    else
        global.findIt   = new FindIt();
    
    function FindIt() {
        var dirs = 0;
        
        function findit(entry) {
            var emitter = Emitify();
            
            setTimeout(function() {
                find(emitter, entry);
            }, 0);
            
            return emitter;
        }
        
        function find(emitter, entry) {
            if (entry.isFile) {
                emitter.emit('file', entry.fullPath, entry);
            } else {
                emitter.emit('directory', entry.fullPath, entry);
                
                ++dirs;
                
                entry.createReader()
                    .readEntries(function(entries) {
                        [].filter.call(entries, function(entry) {
                            find(emitter, entry);
                        });
                        
                        --dirs;
                        
                        if (!dirs)
                            emitter.emit('end');
                    });
                }
            
            return findit;
        }
    }
})(this);
