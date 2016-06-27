import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search'
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyDLQ4sm-k2OKzxcBAXI7OeJmeZLedr9bMo';


// Create a new component. This component should produce come HTML
class App extends Component {
    constructor (props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo:null
        };

        this.videoSearch('surfboards')
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render () {
        // _.debounce from lodash 를 사용하는 이유는 약간의 검색할 때 약간의 delay 를 주기 위해서이다. (300ms)
        // like google search
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
                    videos={this.state.videos} />
            </div>
        );
    }

};


// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));