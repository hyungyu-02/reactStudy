import React from "react";
import { userData } from "./data";

const Content = (props) => {
    const name = "현규";

    const {
        user: {
            name: userName,
            age,
            address: {city, zipcode}
        }
    } = props.userData;
    return (
        <div>
            <h1>Content</h1>
            {name === "현규" ? <div>{name}</div> : <div>false</div>}
            <div>{props.num}</div>

            <div>
                {/* <h1>Name: {userData.user.name}</h1>
                <h1>Age: {userData.user.age}</h1>
                <h1>City: {userData.user.city}</h1>
                <h1>Zipcode: {userData.user.zipcode}</h1> */}
                <h1>Name: {userName}</h1>
                <h1>Age: {age}</h1>
                <h1>City: {city}</h1>
                <h1>Zipcode: {zipcode}</h1>
            </div>
        </div>
    );
}

const Header = () => {
    const num = 32;
    return (
        <h1>
            <div>Title</div>
            <Content num = {num} userData={userData}/>
        </h1>
    );
};

const App = () => {
    return (
        <div>
            <Header />
        </div>
    );
};

export default App;