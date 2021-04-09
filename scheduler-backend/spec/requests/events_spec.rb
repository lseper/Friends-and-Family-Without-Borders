require 'rails_helper'

RSpec.describe "events requests", type: :request do
  before(:context) do 
    post '/login', params: { username: "testuser", password: "password" }
    # token for user_id = 1
    @token = JSON.parse(response.body)["auth_token"]
  end
  describe "GET /index" do

    it "is unauthorized when the user requesting the events for this user" do
      get '/users/3/events', headers: {'Authorization' => 'Bearer ' + @token}
      expect(response).to have_http_status(:unauthorized)

      
    end

    it "is authorized when the user requesting the events for themself" do
      get '/users/1/events', headers: {'Authorization' => 'Bearer ' + @token}
      expect(response).to have_http_status(:ok)
    end

    
  end
end
