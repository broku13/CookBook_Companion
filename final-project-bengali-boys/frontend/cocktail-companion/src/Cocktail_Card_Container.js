import React, { Component } from 'react';
import Cocktail_Card from './Cocktail_Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Top_NavBar from './Top_NavBar';

//[
//     {
//         "Name": "Blue Cheese Burger",
//         "Difficulty": "Normal",
//         "Ethnicity": "American",
//         "Time": "2.5",
//         "Image": "burger.jpg",
//         "Site:": "https://www.allrecipes.com/recipe/24685/blue-cheese-burgers/"
//     },
//     {
//         "Name": "Margherita Pizza",
//         "Difficulty": "Easy",
//         "Ethnicity": "Italian",
//         "Time": "0.5",
//         "Image": "pizza.jpg",
//         "Site:": "https://www.allrecipes.com/recipe/275573/margherita-pizza-with-sausage-and-pesto/"
//     },
//     {
//         "Name": "Japanese Curry",
//         "Difficulty": "Hard",
//         "Ethnicity": "Asian",
//         "Time": "1.5",
//         "Image": "curry.jpg",
//         "Site:": "https://www.allrecipes.com/recipe/274077/japanese-curry/"
//     },
//     {
//         "Name": "Pasta Pomodoro",
//         "Difficulty": "Normal",
//         "Ethnicity": "Italian",
//         "Time": "0.5",
//         "Image": "pasta.jpg",
//         "Site:": "https://www.allrecipes.com/recipe/23847/pasta-pomodoro/"
//     },
//     {
//         "Name": "Beef Lasagana",
//         "Difficulty": "Hard",
//         "Ethnicity": "Italian",
//         "Time": "1.5",
//         "Image": "lasagna.jpg",
//         "Site:": "https://www.allrecipes.com/recipe/220346/eggplant-and-ground-beef-lasagna/"
//     },
//     {
//         "Name": "Pork Fried Rice",
//         "Difficulty": "Normal",
//         "Ethnicity": "Asian",
//         "Time": "0.5",
//         "Image": "rice.jpg",
//         "Site:": "https://www.allrecipes.com/recipe/230818/pork-fried-rice/"
//     },
//     {
//         "Name": "Chicken Quesadillas",
//         "Difficulty": "Easy",
//         "Ethnicity": "Mexican",
//         "Time": "1.0",
//         "Image": "quesadilla.jpg",
//         "Site:": "https://www.allrecipes.com/recipe/21659/chicken-quesadillas/"
//     },
//     {
//         "Name": "Fish Tacos",
//         "Difficulty": "Easy",
//         "Ethnicity": "Mexican",
//         "Time": "1.0",
//         "Image": "tacos.jpg",
//         "Site:": "https://www.allrecipes.com/recipe/53729/fish-tacos/"
//     },
//     {
//         "Name": "Filipino Adobo",
//         "Difficulty": "Easy",
//         "Ethnicity": "Asian",
//         "Time": "1.0",
//         "Image": "adobo.jpg",
//         "Site:": "https://www.allrecipes.com/recipe/128699/famous-chicken-adobo/"
//     },
//     {
//         "Name": "Fluffy Pancakes",
//         "Difficulty": "Hard",
//         "Ethnicity": "American",
//         "Time": "0.5",
//         "Image": "pancakes.jpg",
//         "Site:": "https://www.allrecipes.com/recipe/162760/fluffy-pancakes/"
//     }
// ]

//bruh

class Cocktail_Card_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            food_item: [],
            prev_filters: this.props.filter,

        }
        this.retrieve_food = this.retrieve_food.bind(this);
    }

    CheckFilters(temp){
        console.log(this.props.filter);
        if(this.props.filter){
            console.log("filter exists:")
            console.log(this.props.filter);
            if((temp.Ethnicity != this.props.filter.Ethnicity) && this.props.filter.Ethnicity != "All"){
                console.log("false");
                return false;
            }
            if((temp.Difficulty != this.props.filter.Difficulty) && this.props.filter.Difficulty != "All"){
                console.log("false");
                return false;
            }
            if((temp.Time != this.props.filter.Time) && this.props.filter.Time != "All"){
                console.log("false");
                return false;
            }
        }
        console.log("true");
        return true;
    }

    componentWillReceiveProps(){
            this.state.food_item = [];
            console.log("filters changed");
            this.setState({food_item: this.state.food_item});
            this.ApplyFilters();
        
    }

    componentWillMount(){
        this.retrieve_food();
    }

    ApplyFilters(){
        let temp = this.state.food_item;
        this.state.food_item = [];
        if(this.props.filter){
            for(let i = 0; i < temp.length; i++){
                if(this.CheckFilters(temp[i])){
                    this.state.food_item.push(temp[i]);
                }
            }
        }
        this.retrieve_food = this.retrieve_food.bind(this);
        
    }

    FoodList() {
        return (
          <div>
            {this.state.food_item.map(food_list =>
                 <Cocktail_Card Name={food_list.Name} Site={food_list.Site} Difficulty={food_list.Difficulty} Ethnicity={food_list.Ethnicity} Time={food_list.Time} Image={"/assets/"+food_list.Image} Site={food_list.Site}></Cocktail_Card>
                 )}
          </div>
        );
    }

    retrieve_food = ()=> {
        fetch('http://localhost:3000/foodsite')
            .then(
                function (response) {
                    console.log(response);
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function (data) {
                        this.setState({food_items: data});
                    }.bind(this));
                }.bind(this)
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }



    render() {
        return (
            <div>
                {this.FoodList()}
                <CardGroup>
                </CardGroup>
            </div>);
    }

}

export default Cocktail_Card_Container;