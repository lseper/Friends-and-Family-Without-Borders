require 'rails_helper'

RSpec.describe "users requests", type: :request do
    before(:context) do 
        get '/users'
        @response_hash = JSON.parse(response.body)
    end
    describe "GET #index" do
        it "returns the correct amount of users" do
            expect(@response_hash.length).to eq(2)
        end
    end

    before(:context) do
        post '/login', params: { username: "testuser", password: "password" }
        # token for user_id = 1
        @token = JSON.parse(response.body)["auth_token"]
    end
    describe "GET #show" do
        it "is unauthorized when the user is not logged in" do
            get '/users/1', headers: {'Authorization' => 'Bearer ' + 'fak3t0k3n'}
            expect(response).to have_http_status(:unauthorized)
        end
        it "is authorized when the user is logged in" do
            get '/users/1', headers: {'Authorization' => 'Bearer ' + @token}
            expect(response).to have_http_status(:ok)
        end
        it "returns the correct data for the user" do
            get '/users/1', headers: {'Authorization' => 'Bearer ' + @token}
            response_body = JSON.parse(response.body)
            expect(response_body["username"]).to eq("testuser")
            expect(response_body["name"]).to eq("Test User")
            expect(response_body["email"]).to eq("testuser@gmail.com")
            expect(response_body["privacy"]).to eq(true)
        end
    end

    before(:context) do 
        post '/login', params: { username: "testuser", password: "password" }
        # token for user_id = 1
        @token = JSON.parse(response.body)["auth_token"]
    end
    describe "PUT #update" do
        it "is unauthorized when the user is not logged in" do
            put '/users/1', headers: {'Authorization' => 'Bearer ' + 'fak3t0k3n'}
            expect(response).to have_http_status(:unauthorized)
        end

        # name: params[:name], privacy: params[:privacy], email: params[:email]
        it "is authorized when the user is logged in" do
            put '/users/1', params: { 
                username: "testuser2",
                name: "Test User Jr.",
                privacy: false,
            }, headers: {'Authorization' => 'Bearer ' + @token}
            # unprocessable as no data is being sent, but is authorized
            expect(response).to have_http_status(:ok)
        end
    end

    describe "POST #create" do
        it "creates the user successfully when valid data is passed in" do
            post '/users', params: {
                username: "benjammin",
                password:"password",
                name: "Ben Jammin",
                privacy: false,
                email: "ben@gmail.com"
            }
            user = User.find_by(username: "benjammin")
            expect(user).not_to be_nil
        end

        it "does not create the user when invalid data is passed in" do
            post '/users', params: {
                username: "benjammin",
                password:"password",
                name: "Ben Jammin",
                privacy: nil,
                email: "ben@gmail.com"
            }
            user = User.find_by(username: "benjammin")
            expect(user).to be_nil
        end
    end
end