import React, { Component } from "react";
import header from "./header.css";
import { connect } from "react-redux";
import { actionCreators } from "./store";

class Header extends Component {
  getListArea() {
    const { list,focused, page,totalPage, handleMouseEnter,handleMouseLeave,mouseIn,handleChangePage } = this.props;
    const newList = list.toJS();
    const pageList = [];
    if(newList.length){
      for (let i = (page - 1) * 10; i < page * 10; i++) {
        // console.log(newList[i])
        pageList.push(
          <a className={header.searchInfoItem} key={newList[i]}>
            {newList[i]}
          </a>
        );
      }
    }
    if (focused||mouseIn) {
      return (
        <div
          className={header.searchInfo}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={header.searchInfoTitle}>
            <span className={header.searchInfoTSwitch} onClick={()=>handleChangePage(page,totalPage)}>换一批</span>
            热门搜索
          </div>
          <div className={header.searchInfoList}>{pageList}</div>
        </div>
      );
    } else {
      return null;
    }
  }
  render() {
    const { focused, handleInputFocus, handleInputBlur } = this.props;
    return (
      <div className={header.header}>
        <a className={header.logo} href="http://localhost:3000" />
        <div className={header.nav}>
          <div
            className={header.navItem + " " + header.left + " " + header.active}
          >
            首页
          </div>
          <div className={header.navItem + " " + header.left}>下载App</div>
          <div className={header.navItem + " " + header.right}>登录</div>
          <div className={header.navItem + " " + header.right}>
            <i className="iconfont">&#xe636;</i>
          </div>
          <div className={header.searchWrapper}>
            <input
              className={focused ? header.focused : header.navSearch}
              placeholder="搜索"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
            <i className="iconfont">&#xe60b;</i>
            {this.getListArea()}
          </div>
        </div>
        <div className={header.addition}>
          <button className={header.btn + " " + header.writting}>
            <i className="iconfont">&#xe615;</i>写文章
          </button>
          <button className={header.btn + " " + header.reg}>注册</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // focused: state.get("header").get("focused")
    focused: state.getIn(["header", "focused"]),
    list: state.getIn(["header", "list"]),
    page: state.getIn(["header", "page"]),
    totalPage:state.getIn(["header", "totalPage"]),
    mouseIn: state.getIn(["header", "mouseIn"]),
  };
};
const mapDispathToProps = dispatch => {
  return {
    handleInputFocus() {
      dispatch(actionCreators.getList());
      dispatch(actionCreators.searchFocus());
      //   const action = {
      //     type: "search-focus"
      //   };
      //   dispatch(action);
    },
    handleInputBlur() {
      dispatch(actionCreators.searchBlur());
    },
    handleMouseEnter() {
      dispatch(actionCreators.mouseEnter());
    },
    handleMouseLeave(){
      dispatch(actionCreators.mouseLeave());
    },
    handleChangePage(page,totalPage){
      if(page<totalPage){
        dispatch(actionCreators.changePage(page+1));
      }else{
        dispatch(actionCreators.changePage(1));
      }
      // console.log(page,totalPage)
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Header);
