import React from 'react';
import { connect } from 'react-redux';
import { handleAnswerQuestion } from '../actions/shared';

class Question extends React.Component {
  state = {
    // style class for options
    optionOne: ['question-option'],
    optionTwo: ['question-option'],
  };

  componentDidMount() {
    const { authedUser } = this.props;
    const { optionOne, optionTwo } = this.props.question;
    if ([...optionOne.votes, ...optionTwo.votes].includes(authedUser)) {
      const [chosenOption, dismissedOption] = optionOne.votes.includes(
        authedUser
      )
        ? ['optionOne', 'optionTwo']
        : ['optionTwo', 'optionOne'];
      this.setState((prevState) => ({
        ...prevState,
        [chosenOption]: [...prevState[chosenOption], 'chosen'],
        [dismissedOption]: [...prevState[dismissedOption], 'dismissed'],
      }));
    }
  }

  handleMouseEnter = (hoveredOption) => {
    // run only if not voted yet
    if (!this.props.isAnswered) {
      const nonHoveredOption =
        hoveredOption === 'optionOne' ? 'optionTwo' : 'optionOne';
      this.setState((prevState) => ({
        [nonHoveredOption]: [...prevState[nonHoveredOption], 'no-hover'],
        [hoveredOption]: [...prevState[hoveredOption], 'hover'],
      }));
    }
  };

  handleMouseLeave = () => {
    const { optionOne, optionTwo } = this.state;
    // clear hover and no-hover class on both options when leave
    this.setState({
      optionOne: [...optionOne].filter(
        (c) => !['hover', 'no-hover'].includes(c)
      ),
      optionTwo: [...optionTwo].filter(
        (c) => !['hover', 'no-hover'].includes(c)
      ),
    });
  };

  onClick = (chosenOption, qid) => {
    const { dispatch, authedUser, isAnswered } = this.props;
    //TODO: ask mentor if it is a good practice or should be done as conditional dispatch? If voting is possible not from one component, it could be bad?
    if (!isAnswered) {
      dispatch(handleAnswerQuestion(authedUser, qid, chosenOption));
      const dismissedOption =
        chosenOption === 'optionOne' ? 'optionTwo' : 'optionOne';

      this.setState((prevState) => ({
        [chosenOption]: [...prevState[chosenOption], 'chosen'],
        [dismissedOption]: [...prevState[dismissedOption], 'dismissed'],
      }));
    }
  };

  render() {
    const { question, qid, isAnswered } = this.props;

    function roundNumber(rnum, rlength) {
      var newnumber =
        Math.round(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
      return newnumber;
    }

    const totalAnswers = [
      ...question.optionOne.votes,
      ...question.optionTwo.votes,
    ].length;
    const optionOneAnswers = roundNumber(
      (question.optionOne.votes.length / totalAnswers) * 100,
      1
    );

    const optionTwoAnswers = roundNumber(
      (question.optionTwo.votes.length / totalAnswers) * 100,
      1
    );

    // TODO: ask mentor is it a good approach to define classes of chosen answer this way?

    return (
      <div className='question-display '>
        <h1>Would you rather?</h1>
        <div className='option-container'>
          <div
            className={this.state.optionOne.join(' ')}
            onClick={() => this.onClick('optionOne', qid)}
            onMouseEnter={() => this.handleMouseEnter('optionOne')}
            onMouseLeave={this.handleMouseLeave}
          >
            <p>{question.optionOne.text}</p>
            {isAnswered ? (
              <p className='vote-info'>{optionOneAnswers}%</p>
            ) : null}
          </div>
          <div
            className={this.state.optionTwo.join(' ')}
            onClick={() => this.onClick('optionTwo', qid)}
            onMouseEnter={() => this.handleMouseEnter('optionTwo')}
            onMouseLeave={this.handleMouseLeave}
          >
            <p>{question.optionTwo.text}</p>
            {isAnswered ? (
              <p className='vote-info'>{optionTwoAnswers}%</p>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ questions, authedUser }, props) => {
  const { qid } = props.match.params;
  const question = questions[qid];
  // TODO: ask mentor is it a good approach for oftenly used values - its alike creating container component
  const isAnswered = [
    ...question.optionOne.votes,
    ...question.optionTwo.votes,
  ].includes(authedUser);

  return { question, authedUser, qid, isAnswered };
};

export default connect(mapStateToProps)(Question);
