import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Card from "./../Public/Main/Card";
import StickyBar from './../StickyBar/StickyBar';

class FollowingRoute extends Component {
  state = {
    posts: [],
    following: []
  };

  componentDidMount() {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user/get_circle_content", {
        skip_count: 0
      })
      .then(data => {
        data['data'] = {
          "status": "success",
          "msg": "Fetched Data Successfully",
          "circle_content": [
            {
              "_id": "5c96cbf0784ae878b2ad96d7",
              "url": "static/Ankit/art/22fa0e76-ce2f-4b2d-850d-2472c7bff942.jpg",
              "post_type": "art",
              "shared_type": "public",
              "text": "People say the world is becoming more and more dark and that the light is fading. But when I see the stars in the dark night, it reassures my belief again and again, that this world had always been dark from the very beginning and maybe light came afterwards and maybe light has just begun to break through that small, isolated and dark window.",
              "username": "Ankit",
              "post_title": "Maybe It's the only explanation",
              "author": "Ankit",
              "image_or_text": "false",
              "art_type": "poem",
              "creation_time": "2019-03-24T00:14:40.185",
              "likes": 5,
              "user_liked": [
                {
                  "name": "Madhur Madhyan",
                  "username": "Madhur"
                },
                {
                  "name": "Anurag Sangwan",
                  "username": "Anurag"
                },
                {
                  "name": "Meenal Khare",
                  "username": "_.meenal._"
                },
                {
                  "name": "Sai Satya Sruthi",
                  "username": "rsssruthi"
                },
                {
                  "name": "vishal mahato",
                  "username": "vishal8"
                }
              ],
              "comments": [],
              "total_comments": 0
            },
            {
              "_id": "5c94ca70784ae878ab584f7e",
              "url": "static/Ankit/art/eda0cb61-b9b2-4698-8697-3b9a7080efa5.jpg",
              "post_type": "art",
              "shared_type": "public",
              "text": "आओ आज मुझे कुछ अपना सा कर दो\nइन रंगों में मुझे आसमान सा कर दो\nअब कुछ ठहर सा गया हूं मैं\nकुछ जीतके बहुत कुछ हार सा गया हूं मै\nइस धुएं में घुट सा गया हूं मैं\nअंदर से कुछ सूख सा गया हूं मैं\nआओ खुद को मुझमें कुछ ताजा सा कर दो\nअगर तुम हो कोई नई सुबह, तो मुझको कभी ना ढलने वाली वो दोपहर सा कर दो\nअगर है कोई  फ़िक्र मेरी \nतो मुझे कुछ बर्बाद सा कर दो\nआओ आज मुझे कुछ अपना सा कर दो।।\n                              \n                                     © Ankit Sangwan\n\n",
              "username": "Ankit",
              "post_title": "एक खोई पहचान",
              "author": "Ankit",
              "image_or_text": "false",
              "art_type": "poem",
              "creation_time": "2019-03-22T11:43:44.123",
              "likes": 3,
              "user_liked": [
                {
                  "name": "Madhur Madhyan",
                  "username": "Madhur"
                },
                {
                  "name": "Sadhya Tikkha",
                  "username": "sadhyatikkha"
                },
                {
                  "name": "Anurag Sangwan",
                  "username": "Anurag"
                }
              ],
              "comments": [],
              "total_comments": 0
            },
            {
              "_id": "5c8dcc38784ae878b2ad96a6",
              "url": "static/Ankit/art/dc14b40e-1919-4565-a5fa-4183bedc0691.jpg",
              "post_type": "art",
              "shared_type": "public",
              "text": "No wonder I am still there\n lost in the dark woods of your memories trapped in the alluring web of your smile\n quiet and still like a frozen lake \nbut cracked and broken \nwhen i heard someone's feet trying to take that space \nHoping to find you saving me like all other times in case you are lost just like me\n talk to this moment, this wind \ni'm here where you were \nwhen we first met.",
              "username": "Ankit",
              "post_title": "Where am I?",
              "author": "Ankit",
              "image_or_text": "true",
              "art_type": "poem",
              "creation_time": "2019-03-17T04:25:28.685",
              "likes": 4,
              "user_liked": [
                {
                  "name": "Sadhya Tikkha",
                  "username": "sadhyatikkha"
                },
                {
                  "name": "vishal mahato",
                  "username": "vishal8"
                },
                {
                  "name": "Madhur Madhyan",
                  "username": "Madhur"
                },
                {
                  "name": "Pinak  Modha",
                  "username": "pinakmodha"
                }
              ],
              "comments": [],
              "total_comments": 0
            },
            {
              "_id": "5c6b8ee4784ae878b12a39e0",
              "url": "static/Ankit/art/c7e9b7ec-d7a1-4769-89c0-f7f951b38b02.jpg",
              "post_type": "art",
              "shared_type": "public",
              "text": ".",
              "username": "Ankit",
              "post_title": "Persistence and Determination",
              "author": "Ankit",
              "image_or_text": "true",
              "art_type": "quotes",
              "creation_time": "2019-02-19T05:06:44.271",
              "likes": 8,
              "user_liked": [
                {
                  "name": "Madhur Madhyan",
                  "username": "Madhur"
                },
                {
                  "name": "Ankit Sangwan",
                  "username": "Ankit"
                },
                {
                  "name": "Mohit Verma",
                  "username": "mohitverma"
                },
                {
                  "name": "Dr Ashish Vats",
                  "username": "drVats"
                },
                {
                  "name": "Anurag Sangwan",
                  "username": "Anurag"
                },
                {
                  "name": "Pinak  Modha",
                  "username": "pinakmodha"
                },
                {
                  "name": "Anam Aayat",
                  "username": "Inayatwrites"
                },
                {
                  "name": "Ritik Agarwal",
                  "username": "thescrabbledthoughts"
                }
              ],
              "comments": [
                {
                  "comment_text": "Great 👍",
                  "name": "Dr Ashish Vats",
                  "username": "drVats"
                }
              ],
              "total_comments": 1
            },
            {
              "_id": "5c5edc33784ae878b2ad965b",
              "url": "static/Ankit/art/73df067a-8ca9-43a7-9ca0-6f38fdf4dc29.jpg",
              "post_type": "art",
              "shared_type": "public",
              "text": "कुछ  यूँ  बहती हैं  ये  हवाएं  ....\nधीमी धीमी  कुछ  सर्द सी \nछूती हैं  मुझे  बिना  पूछे  \nउसके  छूने  से  जैसे  जल  गया  मैं  दिए  सा  \nउसके  बातें  करने  से  जैसे  थम  गया  मैं  साहिल सा  \nबस  उसके  साथ  यूँ  ही  किसी  मोड़  पर  अचानक  से  मुड़ना  चाहता  हूँ \nना  कोई  वजह  हो  मुड़ने  की \nना  कोई  सजा  हो  ठहरने  की \nमिलूं  बहारों  से  मुस्कराके \nमिला  दूँ  लहरों  को  ऐसे  जूनून  से  के  अगर \nकोई  कश्ती  फंसी  हो  कहीं  तो  मिल  जाये  कोइ  किनारा  उसे \nउन  सूखे  पत्तों  को , उन  मरी  हुईं  यादों   को \nछूके गुज़रूँ  तो  ज़मीन  से  मिला  दूँ \nउन  लहराते  पेड़  को , उन  प्यार  में  दुबे  दिलो  को \nछूके  गुज़रूँ  तो  बहारों  से  मिला  दूँ II ",
              "username": "Ankit",
              "post_title": "Hwayein",
              "author": "Ankit",
              "image_or_text": "false",
              "art_type": "poem",
              "creation_time": "2019-02-09T13:57:07.161",
              "likes": 7,
              "user_liked": [
                {
                  "name": "Mohit Verma",
                  "username": "mohitverma"
                },
                {
                  "name": "vishal mahato",
                  "username": "vishal8"
                },
                {
                  "name": "Madhur Madhyan",
                  "username": "Madhur"
                },
                {
                  "name": "Ankit Sangwan",
                  "username": "Ankit"
                },
                {
                  "name": "Dr Ashish Vats",
                  "username": "drVats"
                },
                {
                  "name": "Anurag Sangwan",
                  "username": "Anurag"
                },
                {
                  "name": "Pinak  Modha",
                  "username": "pinakmodha"
                }
              ],
              "comments": [],
              "total_comments": 0
            },
            {
              "_id": "5c4f12b4784ae878a98a743e",
              "url": "static/Ankit/art/2cc0a77d-346c-4405-b57b-2fda06615271.jpg",
              "post_type": "art",
              "shared_type": "public",
              "text": "a",
              "username": "Ankit",
              "post_title": "कुछ पुराने चेहरे कुछ नयी बातें",
              "author": "Ankit",
              "image_or_text": "true",
              "art_type": "poem",
              "creation_time": "2019-01-28T14:33:24.250",
              "likes": 6,
              "user_liked": [
                {
                  "name": "Mohit Verma",
                  "username": "mohitverma"
                },
                {
                  "name": "Anurag Sangwan",
                  "username": "Anurag"
                },
                {
                  "name": "Karanveer Singh",
                  "username": "Karansingh7792"
                },
                {
                  "name": "Madhur Madhyan",
                  "username": "Madhur"
                },
                {
                  "name": "Dr Ashish Vats",
                  "username": "drVats"
                },
                {
                  "name": "Pinak  Modha",
                  "username": "pinakmodha"
                }
              ],
              "comments": [],
              "total_comments": 0
            },
            {
              "_id": "5c404591784ae878b2ad9621",
              "url": "static/Ankit/art/b3c361b5-2513-45bc-819c-15cc6e131f35.jpg",
              "post_type": "art",
              "shared_type": "public",
              "text": "आज फिर मुझे कुछ अपना सा कर दे \nइन रंगो में मुझे आसमान सा कर दे ।।\n\n                                  Ankit Sangwan",
              "username": "Ankit",
              "post_title": "In your every thought",
              "author": "Ankit",
              "image_or_text": "true",
              "art_type": "quotes",
              "creation_time": "2019-01-17T09:06:25.493",
              "likes": 5,
              "user_liked": [
                {
                  "name": "Mohit Verma",
                  "username": "mohitverma"
                },
                {
                  "name": "Madhur Madhyan",
                  "username": "Madhur"
                },
                {
                  "name": "Anurag Sangwan",
                  "username": "Anurag"
                },
                {
                  "name": "Dr Ashish Vats",
                  "username": "drVats"
                },
                {
                  "name": "Pinak  Modha",
                  "username": "pinakmodha"
                }
              ],
              "comments": [],
              "total_comments": 0,
              "spam_count": 1,
              "user_reported_spam": [
                {
                  "name": "mayur mahapatra",
                  "username": "mayur"
                }
              ]
            },
            {
              "_id": "5c34421d784ae878a98a7413",
              "url": "static/Ankit/art/9222a701-10cc-4065-b332-54c41435e6c2.jpg",
              "post_type": "art",
              "shared_type": "public",
              "text": "Happiness is merely an illusion we all are chasing, which we are never going to get, instead we should seek Peace and Tranquility.                                   Ankit",
              "username": "Ankit",
              "post_title": "No one has ever been happy",
              "author": "Ankit",
              "image_or_text": "true",
              "art_type": "poem",
              "creation_time": "2019-01-08T06:24:29.523",
              "likes": 3,
              "user_liked": [
                {
                  "name": "Madhur Madhyan",
                  "username": "Madhur"
                },
                {
                  "name": "Ankit Sangwan",
                  "username": "Ankit"
                },
                {
                  "name": "Anurag Sangwan",
                  "username": "Anurag"
                }
              ],
              "comments": [],
              "total_comments": 0
            },
            {
              "_id": "5c30e2c0784ae814bdde9cbf",
              "url": "static/Ankit/art/92d81b67-c806-4703-a18e-17d4a1a5a85f.jpg",
              "post_type": "art",
              "shared_type": "public",
              "text": "सवाल इतने के आसमान भी छुपा ना पाए\nबरस कितना भी ले पर ये आसमान जवाब ना दे पाए\nबरसी उसकी मासूमियत इस तरह मुझ पर\nके जितने भी पुराने रंग थे अब नजर ही ना आए ।।",
              "username": "Ankit",
              "post_title": "आसमान से सवाल",
              "author": "Ankit",
              "image_or_text": "false",
              "art_type": "quotes",
              "creation_time": "2019-01-05T17:00:48.554",
              "likes": 7,
              "user_liked": [
                {
                  "name": "Madhur Madhyan",
                  "username": "Madhur"
                },
                {
                  "name": "Sai Krishna",
                  "username": "Sai krishna"
                },
                {
                  "name": "Mayank Tripathi",
                  "username": "Zammm"
                },
                {
                  "name": "Ankit Sangwan",
                  "username": "Ankit"
                },
                {
                  "name": "Anurag Sangwan",
                  "username": "Anurag"
                },
                {
                  "name": "vishal mahato",
                  "username": "vishal8"
                },
                {
                  "name": "Mohit Verma",
                  "username": "mohitverma"
                }
              ],
              "comments": [],
              "total_comments": 0
            }
          ],
          "followed": [
            {
              "username": "vishal8",
              "name": "vishal mahato",
              "url": "static/vishal8/profile/8a651758-2a94-4129-993d-6ae407e81c80.jpg"
            },
            {
              "username": "Ankit",
              "name": "Ankit Sangwan",
              "url": "static/Ankit/profile/ac001e5e-0a91-44f0-8dcf-5c92575bdc0b.jpg"
            }
          ],
          "just_user": [
            "Ankit"
          ]
        };
        let following =
          data.data && data.data.followed.length > 0
            ? data.data.followed
            : [];
        this.setState({
          posts: data.data.circle_content || [],
          following: following
        });
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }

  changeURL(username) {
    this.props.history.push("/profile/" + username);
  }

  render() {
    let Posts = [];

    Posts = this.state.posts.map(post => {
      return <Card post={post} />;
    });

    let following = this.state.following;
    let ListOfUsers =
      following.length > 0 ? (
        following.map(user => {
          return (
            <div
              className="each-following row px-3"
              onClick={() => {
                this.changeURL.call(this, user.username);
              }}
            >
              <div className="col-2">
                <img
                  className="img-fluid"
                  src={`${process.env.REACT_APP_API_ENDPOINT}` + "/" + user.url}
                />
              </div>
              <div className="col-10">
                <span>{user.name}</span>
              </div>
            </div>
          );
        })
      ) : (
        <div className="each-following row px-3">
          <div className="col-12">
            <span>No Following</span>
          </div>
        </div>
      );


    return Posts.length > 0 ? (
      <div style={{padding: "40px"}}>
        <div {...this.props} class="row">
          <div className="col-md-4">
            <div className="sticky-top">
              {ListOfUsers}
            </div>
          </div>
          <div className="col-md-6">
            {Posts}
          </div>
        </div>
        <StickyBar />
      </div>
    ) : (
      <div {...this.props}>No Posts</div>
    );
  }
}

export default withRouter(FollowingRoute);
