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

    it "gets all of the events for the logged in user when the index action is triggered" do
      get '/users/1/events', headers: {'Authorization' => 'Bearer ' + @token}
      expect(response)
    end

    it "is not creating an event when not authorized" do
      post '/users/3/events', params: { event:{description: "example description", ending_at: "2021-04-03 03:00:00.000000", name: "example  name", user_id: 1, start_time: "2021-04-03 02:00:00.000000", masks_required: false} }, headers: {'Authorization' => 'Bearer ' + @token}
      expect(response).to have_http_status(:unauthorized)
    end

    it "is not creating an event when the user does not exist" do
      post '/users/10/events', params: { event:{description: "example description", ending_at: "2021-04-03 03:00:00.000000", name: "example  name", user_id: 1, start_time: "2021-04-03 02:00:00.000000", masks_required: false} }, headers: {'Authorization' => 'Bearer ' + @token}
      expect(response).to have_http_status(:unauthorized)
    end

    it "is creating an event" do
      post '/users/1/events', params: { event:{description: "example description", ending_at: "2021-04-03 03:00:00.000000", name: "example name", user_id: 1, start_time: "2021-04-03 02:00:00.000000", masks_required: false} }, headers: {'Authorization' => 'Bearer ' + @token}
      puts JSON.parse(response.body)["id"]
      testEvent = Event.find(JSON.parse(response.body)["id"])
      expect(response).to have_http_status(:created)
      expect(testEvent[:name]).to eq("example name")
      expect(testEvent[:description]).to eq("example description")
      expect(testEvent[:start_time]).to eq("2021-04-03 02:00:00.000000")
      expect(testEvent[:ending_at]).to eq("2021-04-03 03:00:00.000000")
      expect(testEvent[:masks_required]).to eq(false)
    end

    it "does not create an event when the end time is greater than the start time" do
      post '/users/1/events', params: { event:{description: "example description", ending_at: "2021-04-03 03:00:00.000000", name: "example  name", user_id: 1, start_time: "2021-04-03 04:00:00.000000", masks_required: false} }, headers: {'Authorization' => 'Bearer ' + @token}
      expect(response).to have_http_status(:unprocessable_entity)
    end

  end
end
