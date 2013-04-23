require 'rubygems'
require 'sinatra'

get '/' do
  File.read(File.join('public', 'index.html'))
end

get '/:special' do
  File.read(File.join('public', params[:special], 'index.html'))
end
