import React, { PureComponent } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {getBook, updateBook, clearBooks, deletePost} from '../../actions';

class EditReview extends PureComponent {

    state = {
       formData: {
           _id: this.props.match.params.id,
            name: '',
            author: '',
            review: '',
            pages: '',
            rating: '',
            price: ''
        }
    }

    handleInput = (event, name) => {
        const newFormData = {
            ...this.state.formData
        }

        newFormData[name] = event.target.value; 

        this.setState({
            formData: newFormData
        });
    }

    formSubmit = (e) => {
        e.preventDefault();

        this.props.dispatch(updateBook(this.state.formData));
    }

    componentWillMount = () => {
        this.props.dispatch(getBook(this.props.match.params.id));
    }


    componentWillReceiveProps(nextProps) {
        let book = nextProps.books.book;

        this.setState({
            formData: {
                _id: book._id,
                name: book.name,
                author: book.author,
                review: book.review,
                pages: book.pages,
                rating: book.rating,
                price: book.price
            }
        });
    }

    componentWillUnmount = () => {
        this.props.dispatch(clearBooks());
    }

    handleDelete = () => {
        this.props.dispatch(deletePost(this.props.match.params.id));
    }

    redirectUser = () => {
        setTimeout(()=> {
            this.props.history.push('/user/user-reviews');
        }, 1500);
    }

    render() {
        console.log(this.props);
        
        return (
            <div className="rl_container article">
                {
                    this.props.books.updateBook ?
                        <div className="edit_confirm">
                            Post updated, <Link to={`/books/${this.props.books.book._id}`}>Click to view updated post</Link>
                        </div>   
                    :null
                }
                {
                    this.props.books.postDeleted ?
                        <div className="red_tag">
                            Post deleted
                            {this.redirectUser()}
                        </div>
                    :null
                }
                <form onSubmit={this.formSubmit}>
                    <h2>Edit review here:</h2>

                    <div className="form_element">
                        <input type="text"
                            placeholder="Enter name"
                            value={this.state.formData.name}
                            onChange={(event)=>this.handleInput(event, 'name')}
                        />
                    </div>
                    <div className="form_element">
                        <input type="text"
                            placeholder="Enter author"
                            value={this.state.formData.author}
                            onChange={(event)=>this.handleInput(event, 'author')}
                        />
                    </div>

                    <textarea 
                        value={this.state.formData.review}
                        onChange={(event)=>this.handleInput(event, 'review')}
                    />
                    <div className="form_element">
                        <input type="number"
                            placeholder="Enter pages"
                            value={this.state.formData.pages}
                            onChange={(event)=>this.handleInput(event, 'pages')}
                        />
                    </div>
                    <div className="form_element">
                        <select value={this.state.formData.rating}
                            onChange={(event)=>this.handleInput(event, 'rating')}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className="form_element">
                        <input type="number"
                            placeholder="Enter price"
                            value={this.state.formData.price}
                            onChange={(event)=>this.handleInput(event, 'price')}
                        />
                    </div>

                    <button type="submit">Edit review</button>
                    <div className="delete_post">
                        <div className="button"
                            onClick={this.handleDelete}
                        >
                            Delete review
                        </div>  
                    </div>
                    <br/>
                </form>              
            </div>
        );
    }
}

const mapStateToProps = (state) => {    
    return {
        books: state.books
    }
}

export default connect(mapStateToProps)(EditReview);