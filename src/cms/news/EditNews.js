import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { updateNews, viewEachNews } from '../../services/newsServives';

export default function EditUser(props) {
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [content, setContent] = useState('');

  const [titleError, setTitleError] = useState('');
  const [subTitleError, setSubTitleError] = useState('');
  const [contentError, setContentError] = useState('');

  useEffect(() => {
    async function getEach() {
      const id = props.match.params.id;
      viewEachNews(id)
        .then((response) => {
          setTitle(response.data.title);
          setSubTitle(response.data.subTitle);
          setContent(response.data.content);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getEach();
  }, [props.match.params.id]);

  async function handleSubmit() {
    if (title === '' || subTitle === '' || content === '') {
      if (title === '') {
        setTitleError('title require');
      } else {
        setTitleError(null);
      }
      if (subTitle === '') {
        setSubTitleError('sub title require');
      } else {
        setSubTitleError(null);
      }
      if (content === '') {
        setContentError('content require');
      } else {
        setContentError(null);
      }
    } else {
      setTitleError(null);
      setSubTitleError(null);
      setContentError(null);
      editData();
    }
  }

  async function editData() {
    const id = props.match.params.id;
    updateNews(title, subTitle, content, id)
      .then((response) => {
        props.history.push('/news');
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="content-wrapper">
      <div>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6"></div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">
                      <Link to="/news" className="btn btn-info mr-2">
                        View news
                      </Link>
                    </h3>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <div className="form-row">
                      <div className="col-md-6 col-12 form-group">
                        <label>
                          Title<i className="required-detail">*</i>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name={title}
                          placeholder="Title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        {titleError ? (
                          <p className="errorMessage"> {titleError}</p>
                        ) : null}
                      </div>
                      <div className="col-md-6 col-12 form-group">
                        <label>
                          Sub title<i className="required-detail">*</i>
                        </label>
                        <textarea
                          rows="2"
                          className="form-control"
                          type="text"
                          name={subTitle}
                          value={subTitle}
                          placeholder="Sub title"
                          onChange={(e) => setSubTitle(e.target.value)}
                        />

                        {subTitleError ? (
                          <p className="errorMessage"> {subTitleError}</p>
                        ) : null}
                      </div>
                      <div className="col-12 form-group">
                        <label>
                          Content<i className="required-detail">*</i>
                        </label>
                        <textarea
                          rows="5"
                          className="form-control"
                          type="text"
                          name={content}
                          value={content}
                          placeholder="Content"
                          onChange={(e) => setContent(e.target.value)}
                        />

                        {contentError ? (
                          <p className="errorMessage"> {contentError}</p>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="card-header">
                    <h3 className="card-title">
                      <Link
                        to="#"
                        onClick={() => handleSubmit()}
                        className="btn btn-info mr-2"
                      >
                        Update Record
                      </Link>
                    </h3>
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
                {/* /.card */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    </div>
  );
}
