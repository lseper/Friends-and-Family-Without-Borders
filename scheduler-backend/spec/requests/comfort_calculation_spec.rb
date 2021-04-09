require 'rails_helper'

include ComfortCalculation

RSpec.describe ComfortCalculation do
    before(:context) do
        @App = ApplicationController.new
        beforeInvitee = Invitation.new(event_id: 1, user_id: 3, priority: true, confirmed: false, comfort_level: 0)
        @invitee = @App.setup_invitee(beforeInvitee)
        puts @invitee
        @pairs = LocationActivitySuggestion.all
        @pairs = @App.setup_pairs(@pairs)
        puts @pairs
    end

    it 'calc_location_score returns correct value when location_type is Outside' do
        @outside_pair = @pairs[0]
        location = @outside_pair[:location]
        expect(ComfortCalculation.calc_location_score(location, @invitee)).to eq(0.09)
    end
    
    it

end
