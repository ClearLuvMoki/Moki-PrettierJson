import './App.css';
import {JSONEditor} from "../core"

const App = () => {
  return (
    <div className="content">
     <JSONEditor
        content={{name: "1212"}}
     />
    </div>
  );
};

export default App;
