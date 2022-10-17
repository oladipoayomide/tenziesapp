import { Link } from "react-router-dom";
const NotPage = () => {


    return ( 
        <div className="not-page">
            <h1>404</h1>
            <h2>Page is not found</h2>
            <Link to='/' ><button 
            className="roll" style={{
                marginTop: '10px'
            }}>Return to Home</button></Link>
        </div>
     );
}
 
export default NotPage;