import React, { Component } from 'react';
import Stackoverflow from 'react-icons/lib/fa/stack-overflow';
import PiedPiper from 'react-icons/lib/fa/pied-piper-alt';
import JSFiddle from 'react-icons/lib/fa/jsfiddle'
import Github from 'react-icons/lib/fa/github';
import Codepen from 'react-icons/lib/fa/codepen';
import Medium from 'react-icons/lib/fa/medium';


class Logo extends Component {
    constructor(props){
        super(props)
        this.state = {
            origin: props.origin
        }
    }


    logo(){
        const { origin } = this.state;
        switch(origin){
            case 'stackoverflow':
            return <Stackoverflow />
            break;
            case 'github':
            return <Github />
            break;
            case 'repl.it':
            return <img src='https://avatars3.githubusercontent.com/u/983194?s=280&v=4' alt='repl.it' />
            break;
            case 'codepen':
            return <Codepen />
            break;
            case 'mdn':
            return <img src='https://pbs.twimg.com/profile_images/880614604115775489/LNPwoiWi_400x400.jpg' alt='repl.it' />
            break;
            case 'w3':
            return <img src='https://vignette.wikia.nocookie.net/howtoprogram/images/c/ce/W3Schools.png/revision/latest?cb=20130601232401' alt='repl.it' />
            break;
            case 'medium':
            return <Medium />
            break;
            case 'JSFiddle':
            return <JSFiddle />
            break;
            case 'else':
            return <PiedPiper />
            break;
        }
    }

    render() {
        return (
            <span className='origin'>
                {this.logo()}
            </span>
        );
    }
}

export default Logo;