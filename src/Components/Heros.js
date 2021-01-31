import React, { Component } from 'react'
import Edithero from './Edithero';
import Hero from './Hero'
import heroService from '../api';

export default class Heros extends Component {
    constructor(){
        super();
        this.state= { heroes:[] , addingHero:false}
        this.handleSelect = this.handleSelect.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleEnableAddMode = this.handleEnableAddMode.bind(this)
        this.handleDelete = this.handleDelete.bind(this);
    }


    componentDidMount(){
        heroService.get().then(json => {
            this.setState({heroes:json})
        })
    }

    handleSelect(hero) {
        this.setState({selectedHero:hero})
    }

    handleSave(){
      let heroes = this.state.heroes;

      if(this.state.addingHero){
        heroService.create(this.state.selectedHero).then(hero => {
          heroes.push(hero);

          this.setState({
            heroes:heroes,
            addingHero:false,
            selectedHero:null
          })
        })
      }else{
        heroService.update(this.state.selectedHero).then(() => {
          this.setState({selectedHero:null})
        })
      }
    }

    handleEnableAddMode(){
        this.setState({
            addingHero:true,
            selectedHero:{id:'',name:'',saying:''}
        })
    }

    handleDelete(event,hero){
      event.stopPropagation();

      heroService.destroy(hero).then(() => {
        let heroes = this.state.heroes;
        heroes = heroes.filter(h => h !== hero);
        this.setState({heroes:heroes});
        
        if(this.selectedHero === hero){
          this.setState({selectedHero:null});
        }
      
      })

    }

    handleCancel(){
        this.setState({selectedHero:null, addingHero:false})
    }

    handleChange(event){
        let selectedHero = this.state.selectedHero;
        selectedHero[event.target.name] = event.target.value;
        this.setState({selectedHero:selectedHero})
    }

  render() {
    return (
      <div>
        <ul className="heroes">
            
             {this.state.heroes.map(hero => {
                return (
                  <Hero hero={hero} onSelect={this.handleSelect} selectedHero={this.state.selectedHero} onDelete = {this.handleDelete}/>
                );
              })}
            
        </ul>
        <div className="editarea">
            
                <button onClick={this.handleEnableAddMode}>Add New Hero</button>
                <Edithero addingHero={this.state.addingHero}  selectedHero={this.state.selectedHero}
                onChange={this.handleChange} 
                onSave = {this.handleSave}
                onCancel={this.handleCancel}
                />
            
        </div>
      </div>
    )
  }
}
