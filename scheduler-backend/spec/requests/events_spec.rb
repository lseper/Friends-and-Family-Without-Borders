require 'rails_helper'

RSpec.describe "events requests", type: :request do
  before(:context) do 
    post '/login', params: { username: "testuser", password: "password" }
    # token for user_id = 1
    @token = JSON.parse(response.body)["auth_token"]
  end
  describe "GET #index (general)" do

    it "is unauthorized when the user requesting the events for this user" do
      get '/users/3/events', headers: {'Authorization' => 'Bearer ' + @token}
      expect(response).to have_http_status(:unauthorized)
    end

    it "is authorized when the user requesting the events for themself" do
      get '/users/1/events', headers: {'Authorization' => 'Bearer ' + @token}
      expect(response).to have_http_status(:ok)
    end

    before(:context) do 
      get '/users/1/events', headers: {'Authorization' => 'Bearer ' + @token}
      @response_hash = JSON.parse(response.body)
      # puts @response_hash[0].keys[1] == 'invitees'
      # # puts @response_hash[1]
    end
    describe "GET #index (specific)" do

      it "returns two events for the logged in user" do
        expect(@response_hash.length).to eq(2)
      end

      it "returns one invitee for the first event" do
        expect(@response_hash[0]['invitees'].length).to eq(1)
      end

      it "returns zero invitees for the second event" do
        expect(@response_hash[1]['invitees'].length).to eq(0)
      end
      
    end
  end

  describe "POST #create" do
    # create testing here
  end

  describe "PUT #update" do
    it "is unauthorized when the user tries to update an event they are not the owner of" do
      post '/login', params: { username: "billbob", password: "billbob" }
      # token for user_id = 2
      false_token = JSON.parse(response.body)["auth_token"]
      put '/events/2', headers: {'Authorization' => 'Bearer ' + false_token}
      expect(response).to have_http_status(:unauthorized)
    end

    it "is authorized when the user requesting the events for themself" do
      put '/events/2', params: { pair: {
        id: 1,
        location: {
            id: 1,
            location_type: "Outside"
        },
        activity: {
            id: 2,
            name: "sports",
            socialDistanceScore: 2,
            hasFood: false,
            minPeople: 6,
            maxPeople: 20
        },
        priority_passed: 1,
        others_passed: 0,
        average_comfort: 0.96
    } }, headers: {'Authorization' => 'Bearer ' + @token}
      expect(response).to have_http_status(:ok)
    end
    # update testing here
  end
end
