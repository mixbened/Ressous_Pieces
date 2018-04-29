import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Remove from 'react-icons/lib/go/x';
import Logo from '../Logo';

class ArticleItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            descr: '',
            id: '',
            check_field: false,
        }
    }

    deleteArticleFn(id){
        this.props.deleteArticleFn(id);
    }



    render() {
        const { title, url, article_id, origin } = this.props
        return (
            <div>
                <li className='list-group-item'>
                    <div className='infoBox'>
                        <div className='titleBox'>
                            <p>{title}</p>
                        </div>
                        <div className='descrBox'>
                            <Link to={url}><p>{url}</p></Link>
                        </div> 
                    </div>
                    <div className='boxBox'>
                        <div><Remove className='iconSmall' onClick={() => this.deleteArticle(article_id)}/></div>
                        <div><Logo className='origin' origin={origin}/></div>
                    </div>
                </li>
            </div>
        );
    }
}

export default ArticleItem;