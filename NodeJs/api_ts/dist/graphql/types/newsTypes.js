"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
scalar Date
 
  type Query {
    newslist: [News]
    newsById(id: String): News    
  }
 
  type News { 
    _id: String,
    hat: String,
    title: String,
    text: String,
    author: String,
    img: String,
    publishDate: Date,
    tag: String,
    link: String,
    active: Boolean 
  } 
 
  type Mutation {
    addNews(input: NewsInput) : News  
    updateNews(id: String, input:NewsInput): News
    deleteNews(id: String): News
  }
 
  input NewsInput {     
    _id: String,
    hat: String,
    title: String,
    text: String,
    author: String,
    img: String,
    publishDate: Date,
    tag: String,
    link: String,
    active: Boolean 
  } 
  `;
