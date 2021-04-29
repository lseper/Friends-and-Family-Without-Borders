require 'rails_helper'

RSpec.describe "invitation requests", type: :request do
  before(:context) do 
    post '/login', params: { username: "billbob", password: "BillBob@2021" }
    # token for user_id = 2
    @token = JSON.parse(response.body)["auth_token"]
  end
  describe "GET #index (general)" do
    it "is authorized when the correct token is sent" do
        get '/users/2/invitations', headers: { 'Authorization' => "Bearer " + @token}
        expect(response).to have_http_status(:ok)
    end
    it "is unauthorized when the incorrect token is sent" do
        get '/users/1/invitations', headers: {'Authorization' => "Bearer " + @token}
        expect(response).to have_http_status(:unauthorized)
    end
  end

  before(:context) do
    post '/login', params: {username: "billbob", password: "BillBob@2021"}
    # token for user_id = 2
    @token = JSON.parse(response.body)["auth_token"]
    get '/users/2/invitations', headers: {'Authorization' => 'Bearer ' + @token}
    @response_hash = JSON.parse(response.body)
  end
  describe "GET #index (specific)" do 
    it "returns only one invitations for this use (future invitations)" do
        expect(@response_hash.length).to eq(1)
    end
  end

  before(:context) do
    post '/login', params: {username: "billbob", password: "BillBob@2021"}
    # token for user_id = 2
    @token = JSON.parse(response.body)["auth_token"]
  end
  describe "POST #create" do
    it "only lets the creator of an event create invitations for that event" do
        post "/invitations", params: {
            event_id: 1,
            invitees: [
            { user_id: 3,
            priority: true },
            ]
        }, headers: {'Authorization' => 'Bearer ' + @token}
        expect(response).to have_http_status(:unauthorized)
    end
    it "does not let the event owner add themselves to the event" do
        post '/login', params: { username: "testuser", password: "Password@2021" }
        # token for user_id = 1
        @token = JSON.parse(response.body)["auth_token"]
        post "/invitations", params: {
            event_id: 1,
            invitees: [
            { user_id: 1,
            priority: true },
            ]
        }, headers: {'Authorization' => 'Bearer ' + @token}
        expect(response).to have_http_status(:unprocessable_entity)
    end
  end
  before(:context) do
    post '/login', params: {username: "billbob", password: "BillBob@2021"}
    # token for user_id = 2
    @token = JSON.parse(response.body)["auth_token"]
  end
  describe "PUT #update" do
    it "is unauthorized when not the user is trying to update" do
      put '/users/2/invitations/1', params: { confirmed: false }, headers: {'Authorization' => 'Bearer ' + "fak3 t0k3n"}
      expect(response).to have_http_status(:unauthorized)
    end

    it "is updates the invitation when the invitation owner updates it" do
      put '/users/2/invitations/1', params: { confirmed: true }, headers: {'Authorization' => 'Bearer ' + @token}
      invite = Invitation.find(1)
      expect(invite.confirmed).to eq(true)
    end
  end
end
