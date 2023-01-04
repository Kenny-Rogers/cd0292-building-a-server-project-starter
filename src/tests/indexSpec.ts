import * as request from 'request';

describe('Images endpoint',  () => {
  it('should return a resized image', done => {
    request.get({
        url: 'http://localhost:3000/images?width=200&height=200&fileName=fjord',
        encoding: null
      }, (error: any, response: request.Response, body: any) => {
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toBe('image/jpeg');
        done();
    });
  });

  it('should return a 400 error if the width or height parameter is missing', done => {
    request.get({
      url: 'http://localhost:3000/images?width=200&height=200',
      encoding: null
    }, (error: any, response: request.Response, body: any) => {
      expect(response.statusCode).toBe(400);
      expect(response.body.toString()).toBe('Width, height and fileName parameters are required');
      done();
    });
  });


  it('should return a 404 error if the file is not found', done => {
    request.get({
        url: 'http://localhost:3000/images?width=200&height=200&fileName=ffjord',
        encoding: null
      }, (error: any, response: request.Response, body: any) => {
        expect(response.statusCode).toBe(404);
        expect(response.body.toString()).toBe('File not found');
        done();
    });
    });
});