import profileModel from "./models/profile_model"
import { connect } from 'react-redux';

const Activities = {
  // hard coding actions and durations 
  // where durations are in minutes
  calling_parents: 15,
  going_for_walk: 30,
  gym: 60,
  nap: 30,
  catch_up_with_friend: 20,
  new_song: 10,
  meditate: 15,
  homework: 120,
  bake: 60,
  cleaning_task: 20,
  play_instrument: 45,
  go_for_a_drive: 20,
  bike: 40,
  rollerblade: 25,
  watch_episode: 45,
  read_chapter: 15,
  journal: 5,
  listed_podcast: 30,
  drink_water: 1,
  stretch: 5,
  article: 5,
}

function generateActivity () {
  let rand_index = Math.random() * 21; //where 21 is number of activities
  let rand_activity = Activities[rand_index];
  if (profileModel.stress.includes(rand_activity)){
    generateActivity();
  }
  return rand_activity;
}

const mapStateToProps = (state) => ({
  events: state.events.all,
});

export default connect(mapStateToProps, { generateActivity })(Activities);