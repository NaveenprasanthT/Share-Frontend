import logo from "../../../assest/logo1.jpg";
import login from "../../../assest/post/login.png";
import loginmob from "../../../assest/post/loginmob.png";
import After from "../../../assest/post/After.png";
import follow from "../../../assest/post/follow.png";
import followphne from "../../../assest/post/followphne.png";
import followbtn from "../../../assest/post/followbtn.png";
import followposts from "../../../assest/post/posts.png";
import view from "../../../assest/post/view.png";
import profile from "../../../assest/post/profile.png";
import share from "../../../assest/post/share.png";
import refresh from "../../../assest/post/refresh.png";


export const posts = [
    {
        desc:"Hello User, this app is to connect with people around you...",
        img:logo
    },
    {
        desc:"You can create an account using the SignIn button shown in the screen... In PC",
        img:login
    },
    {
        desc:"You can create an account using the SignIn button shown in the screen.... In mobile",
        img:loginmob
    },
    {
        desc:"After successful Registration and login Your Pages will Look like this...",
        img:After
    },
    {
        desc:"You can view other user home page by clicking their Profile Picture",
        img:follow
    },
    {
        desc:"In case of Phone you can view other user Profile in Menu card...",
        img:followphne
    },
    {
        desc:"In profile page of other User you can Follow other Users by clicking the follow button...Once you click the follow button it will trun into Unfollow",
        img:followbtn
    },
    {
        desc:"After following a User You can refresh your Homepage to see their posts(If any posts available)...You can also like others post",
        img:followposts,
    },
    {
        desc:"You can also view and edit your profile page by using these Options",
        img:view
    },
    {
        desc:"To update a Profile picture, select the Picture and wait till the image is displayed on the screen & and click Update button...Then wait till it Updates.",
        img:profile,
    },
    {
        desc:"You can also share your own posts...Select an image and wait till the image is displayed on the screen, then click share button...",
        img:share
    },
    {
        desc:"Once you click the share button the page will refresh and Your Post will be shown...",
        img:refresh
    },
    {
        desc:"And finally this app may have some bugs and still I am working on it...And no logout facilities are added...In any case,if you need to logout you can clear your LocalStorage(Brower) and the app will automatically will logged off.",
        img:logo
    },
]