import React, { Component } from 'react';
import './menu.css'
import duelIcon from '../../svg/duel.svg';
import singlePlayer from '../../svg/human.svg'

class menu extends Component {

    constructor()
    {   super();
        this.isDuel = false;
        this.player1 = '';
        this.player2 = 'CPU';
    }

    onclickNewGame = () => {
        let elem = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        elem.id = 'newgame-strikeline';
        elem.setAttribute('x1', 8); elem.setAttribute('x2', 120);
        elem.setAttribute('y1', 20); elem.setAttribute('y2', 20);
        document.querySelector('#new-game-button > svg').appendChild(elem);

        let htmlCollections = [...Object.values(document.getElementsByClassName('svg-text-player1')), ...document.getElementsByClassName('svg-text-player2')];
        htmlCollections.forEach(arr => {
            arr.style.display = 'block';
        })
        
        if(!this.isDuel && this.player1 === '') {
            this.player1 = 'player 1';
            this.player2 = 'CPU';
        }
        else if (this.isDuel) {
            if(this.player1 === '')
                this.player1 = 'player 1';
            if(this.player2 === '')
                this.player2 = 'player 2';
        }
            
        let menu = document.getElementById('menu'), board = document.getElementById('board'), svgBoard = document.getElementById('svg-board');
        setTimeout(() => {
            menu.animate([{opacity: 1}, {opacity: 0}], {duration: 300});
            svgBoard.style.display = 'none';
            setTimeout(() => {
                menu.style.display = 'none';
                board.style.animation = 'fade-out .3s';
                setTimeout(() => {
                    svgBoard.style.display = 'block';
                    board.style.opacity = '1';
                    board.style.filter = 'none';
                    elem.remove();
                }, 200);
            }, 200);
        }, 300);
        this.props.newGame(this.isDuel, this.player1, this.player2);
    }
    
    render () {
        
        return (
        <div id='menu'>
            <div className='player-menu' id='playerX' >
                    <span id='playerX' className='player-name' >Player X</span><input className='playerNameInput' type='text' minLength='3' maxLength='10' defaultValue='player 1' onChange={(e) => {this.player1 = e.target.value}} />
                </div>
                <div className='player-menu' id='playerO'>
                    <span className='player-name' >Player O</span><input className='playerNameInput'  id='player2' type='text' minLength='3' maxLength='10' defaultValue='CPU' readOnly onChange={(e) => {this.player2 = e.target.value}} />
                </div>
                <div className='player-menu'>
                        <label><input id='not-duel' className='playing-mode' type='radio' name='mode' defaultChecked='true' 
                                onChange={() => {
                                    this.isDuel = false;
                                    let elem =  document.getElementById('player2'); 
                                    elem.value = 'CPU'; this.player2 =  'CPU'; 
                                    elem.setAttribute('readOnly', true)}
                                    }/><img className='player-icon' src={singlePlayer} alt='singlePlayer' draggable='false' /></label>
                        <label><input id='duel' className='playing-mode' type='radio' name='mode' draggable='false'
                                onChange={() => {
                                    this.isDuel = true;
                                    let elem =  document.getElementById('player2'); 
                                    elem.value = 'player 2'; this.player2 = 'player 2'; 
                                    elem.removeAttribute('readOnly', false)}
                                    }/><img className='player-icon' src={duelIcon} alt='duel' draggable='false' /></label>
                </div>
                <div style={{marginTop: '20px'}} id='new-game-button' >
                    <svg height='40px' width='130px' viewBox='0 0 130 40' onClick={this.onclickNewGame}>
                    <rect x='0' y='0' rx='10' ry='10'   width='130' height='40' fill='#0066ff' />
                    <text x='14' y='27' id='svg-newgame' >New Game</text>
                    </svg>
                </div>
                <div style={{height: '100px'}} />
            </div>
        );
    }
}

export default menu;