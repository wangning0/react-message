import Message from '../../src/index';
const MessageInstance = Message.newInstance({});


function simpleFn() {
    console.log(1);
  MessageInstance.message({
    content: <span>success</span>,
    onClose() {
      console.log('simple close');
    },
    type: 'success'
  });
}

function durationFn() {
  MessageInstance.message({
    content: <span>error</span>,
    type: 'error'
  });
}

function closableFn() {
  MessageInstance.message({
    content: <span>warning</span>,
    type: 'warning'
  });
}

function close(key) {
  MessageInstance.removeMessage(key);
}

function manualClose() {
  const key = Date.now();
  MessageInstance.message({
    content: <div>
      <p>click below button to close</p>
      <button onClick={close.bind(null, key)}>close</button>
    </div>,
    key,
    duration: null,
  });
}

function App() {
    return (
        <div>
            <div>
                <button onClick={simpleFn}>success</button>
                <button onClick={durationFn}>error</button>
                <button onClick={closableFn}>warning</button>
            </div>
        </div>
    )
};

export default App;