import Css from './style.css';
import React from "react";
import ReactDOM from "react-dom";
const KEY_FOR_LOC_STOR = "locComments";

class Comments extends React.Component{
    constructor(){
    super();
      this.state = {
        comments: [{user: "", comment: "", date: "", deleteButton: "",}],
        deleteButton: "",
        textAreaValue: "Комментарий",
        nameAreaValue: "Иванов",
      };
  }

  addComments(){
    const strFromTexArea = this.state.textAreaValue;
    const nameFromTexArea = this.state.nameAreaValue;
    if((strFromTexArea.length > 0) && (nameFromTexArea.length > 0)){

      let newComment = JSON.parse(localStorage.getItem(KEY_FOR_LOC_STOR));
      let md = new Date();

      if(!newComment)
      newComment = this.state.comments;

      newComment.push({
        comment: strFromTexArea,
        user: nameFromTexArea,
        date: md.toGMTString(),
        deleteButton: "",
      });

      const serialComment = JSON.stringify(newComment);
      localStorage.setItem(KEY_FOR_LOC_STOR, serialComment);

      this.setState({
        newComment,
        textAreaValue: 'Какой-нибудь комментарий',
        nameAreaValue: 'Иванов',
      });

    }
  }

  deleteComment(idComment){
    let newComments = JSON.parse(localStorage.getItem(KEY_FOR_LOC_STOR));
    newComments.splice(idComment, 1);
    const serialComment = JSON.stringify(newComments);
    localStorage.setItem(KEY_FOR_LOC_STOR, serialComment);
    this.setState({newComments});
  }

  render(){
    let myCommArray = JSON.parse(localStorage.getItem(KEY_FOR_LOC_STOR));
    if(!myCommArray)
    myCommArray = [];
    return(
      <div>
        <textarea name="comment-text" rows="8" cols="80"
        value={this.state.textAreaValue}
        onChange={ev => {this.setState({textAreaValue: ev.target.value})
        }}>Комментарий</textarea><br />

        <textarea name="autor-name" rows="1" cols="50"
        value={this.state.nameAreaValue}
        onChange={ev => {this.setState({nameAreaValue: ev.target.value})
        }}>Введите имя</textarea><br />

        <button onClick={ev => {this.addComments();}}>ADD COMMENTS</button>

        {myCommArray.map((value, i) => {
        if(!value.user.length)
            return;
          return (
            <div key={i}>
              {value.user}<br />{value.comment}<br />{value.date}
              <button onClick={ev => {this.deleteComment(i);}}>DELETE COMMENT</button>
            </div>
          );
        })}

      </div>

  );}
}

//------------------------------------------------------------------------------
ReactDOM.render(
  <Comments />,
  document.querySelector('#app')
);
