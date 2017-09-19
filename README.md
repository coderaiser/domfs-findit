# DOM File System Findit

Similar to [node-findit](https://github.com/substack/node-findit "Node Findit") but for [Dom File System](https://developer.mozilla.org/en-US/docs/Web/API/FileSystem "Dom File System").

## Install

```
npm i findit
```

## How to use?

```html
<script src="modules/emitify/lib/emitify.js"></script>
<script src="lib/findit.js"></script>
```

```js
window.addEventListener('drop', (e) => {
    e.preventDefault();
    
    const item = e.dataTransfer.items[0];
    const entry = item.webkitGetAsEntry();
    const finder = findit(entry);
    
    finder.on('file', (file, entry) => {
        console.log('file: ', file, entry);
    });
    
    finder.on('directory', (file, entry) => {
        console.log('directory: ', file, entry);
    })
    
    finder.on('end', () => {
        console.log('done');
    })
});

node.addEventListener('dragover', (e) => {
    e.preventDefault();
});
```

## License

MIT

