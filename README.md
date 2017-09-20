# DOM File System Findit

Similar to [node-findit](https://github.com/substack/node-findit "Node Findit") but for [Dom File System](https://developer.mozilla.org/en-US/docs/Web/API/FileSystem "Dom File System").

## Install

```
npm i domfs-findit
```

## How to use?

You can use minified `findit` bundle with:

```html
<script src="dist/findit.min.js"></script>
```

When you use webpack just import `findit` with:

```js
import findit from `domfs-findit`;
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

