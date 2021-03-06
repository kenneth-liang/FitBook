import React from 'react';
import { Redirect } from 'react-router-dom'

class WorkoutForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            notes: '',
            exercises: [],
            search: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addExercise = this.addExercise.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.removeExercise = this.removeExercise.bind(this);
    };

    componentDidMount() {
        this.props.fetchUserExercises(this.props.user.id);
    };

    updateSearch(e) {
        this.setState({ search: e.target.value.substring(0, 20)});
    };

    update(field) {
        return (e) => {
            this.setState({ [field]: e.currentTarget.value });
        };
    };

    addExercise(exerciseId) {
        return () => {
            let currentExercises = this.state.exercises;
            currentExercises.push(exerciseId);
            this.setState({ exercises: currentExercises });
        };
    };

    removeExercise(exerciseId) {
        return (e) => {
            e.preventDefault();
            let prevExercises = this.state.exercises;
            let currentExercises = prevExercises.filter( ele => (ele !== exerciseId))
            this.setState({ exercises: currentExercises })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const newWorkout = Object.assign({}, this.state);
        delete newWorkout["search"]
        this.props.createWorkout(newWorkout);
    };

    // Curently, the only errors that can occur are for not having a title so this.props.errors will return
    // an object { title: 'Title cannot be empty' } instead of an array (I think) so for now a quick fix
    // is to just render this one error (instead of looping through the errors)
    renderErrors() {    
        return (
            <div>{this.props.errors.title}</div>
        )
    };

    render() {
        let filteredExercises = (Object.values(this.props.exercises)).filter((exercise) => {
            return exercise.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        });


        return(
            <div className="workout-form-container">
                <div className="col-md-6 workout-form-left">
                    <form className="new-workout-form" onSubmit={this.handleSubmit}>
                        {this.renderErrors()}
                        <div className="workout-form-title">
                            <label className="workout-form-type">Title</label>
                            <input 
                                className="workout-form-field"
                                type="text"
                                onChange={this.update('title')}
                                value={this.state.title}
                            />
                        </div>

                        
                            <div className="workout-form-notes">
                                <label className="workout-form-type">Notes</label>
                                <textarea 
                                    onChange={this.update('notes')}
                                    value={this.state.notes}
                                    placeholder='Notes (ex. Upper chest focused workout)'
                                    cols="50" rows="20">
                                </textarea>
                            </div>

                            <label className="workout-form-type">Exercises
                                {this.state.exercises.map((exerciseId, i) => {
                                    return (
                                        <>
                                        <li key={`workout-exercise-${i}`}
                                            className="workout-exercise-item">
                                            {this.props.exercises[exerciseId].title}
                                        </li>
                   
                                        <button className="remove-workout-exercise" onClick={this.removeExercise(exerciseId)}>
                                            Delete
                                        </button>
                                        </>
                                    )
                                })}
                            </label>
                        
                        <Redirect to="/workouts">
                            <input 
                                type="submit" 
                                className="workout-form-submit" 
                                value="Create Workout"
                            />
                        </Redirect>
                    </form>
                </div>

                            
                <div className="col-md-6 workout-form-right"> 
                    <div className="exercise-list">
                        <input 
                            type="text"
                            value={this.state.search}
                            onChange={this.updateSearch}
                            placeholder='Filter by exercise'
                        />
                        <ul className="exercise-ul">
                            {/* {Object.values(this.props.exercises).map((exercise, i) => ( */}
                            {filteredExercises.map((exercise, i) => (
                                <li className="exercise-item-list " key={`exercise-${i}`} onClick={this.addExercise(exercise._id)}>
                                    <div>
                                        <div className="exercise-list-title">{exercise.title}</div>
                                        <div className="exerise-list-category">Category: {exercise.category}</div>
                                        <div className="exerise-list-equipment">Equpiment: {exercise.equipment}</div>
                                    </div>
                                    <div className="exercise-img">
                                        <div className={`exercise-img-${exercise.category.toLowerCase()}` } />     
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        );
    };
};

export default WorkoutForm;