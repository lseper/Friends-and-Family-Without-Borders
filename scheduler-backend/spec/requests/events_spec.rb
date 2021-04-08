require 'rails_helper'

RSpec.describe "events requests", type: :request do
  describe "GET /index" do

    it "is unauthorized when the user requesting the events for this user" do
      get '/users/10/events'

      expect(response).to have_http_status(:unauthorized)
    end
  end
end
