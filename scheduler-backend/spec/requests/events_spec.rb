require 'rails_helper'

RSpec.describe "events requests", type: :request do
  before(:context) do 
    post '/login', params: { username: "testuser", password: "password" }
    # token for user_id = 1
    @token = JSON.parse(response.body)["auth_token"]
  end
  describe "GET #index" do

    it "is unauthorized when the user requesting the events for this user" do
      get '/users/3/events', headers: {'Authorization' => 'Bearer ' + @token}
      expect(response).to have_http_status(:unauthorized)

      
    end

    it "is authorized when the user requesting the events for themself" do
      get '/users/1/events', headers: {'Authorization' => 'Bearer ' + @token}
      expect(response).to have_http_status(:ok)
    end

    it "gets all of the events for the logged in user when the index action is triggered" do
      get '/users/1/events', headers: {'Authorization' => 'Bearer ' + @token}
      response_hash = JSON.parse(response.body)
      expect(response_hash.length).to eq(2)
    end
  end

  describe "POST #create" do
    # create testing here
  end

  describe "PUT #update" do
    # update testing here
  end
end
