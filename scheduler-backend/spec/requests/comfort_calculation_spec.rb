require 'rails_helper'

include ComfortCalculation, Format

RSpec.describe ComfortCalculation do
    before(:context) do
        @App = ApplicationController.new
        beforeInvitee = Invitation.new(event_id: 1, user_id: 3, priority: true, confirmed: false, comfort_level: 0)
        @invitee = @App.setup_invitee(beforeInvitee)
        @pairs = LocationActivitySuggestion.all
        @pairs = setup_pairs(@pairs)
    end
    describe "calc_location_score" do

        it 'calc_location_score returns correct value when location_type is Outside' do
            @outside_pair = @pairs[0]
            location = @outside_pair[:location]
            expect(ComfortCalculation.calc_location_score(location, @invitee)).to eq(0.09)
        end
        
        it 'calc_location_score returns correct value when location_type is Large Inside' do
            @large_inside_pair = @pairs[4]
            location = @large_inside_pair[:location]
            expect(ComfortCalculation.calc_location_score(location, @invitee)).to eq(0.08)
        end
        
        it 'calc_location_score returns correct value when location_type is Small Inside' do
            @small_inside_pair = @pairs[8]
            location = @small_inside_pair[:location]
            expect(ComfortCalculation.calc_location_score(location, @invitee)).to eq(0.07)
        end
    
        it 'calc_location_score returns correct value when location_type is Online' do
            @online_pair = @pairs[11]
            location = @online_pair[:location]
            expect(ComfortCalculation.calc_location_score(location, @invitee)).to eq(0.06)
        end

    end

    describe 'calc_eating_score' do

        it 'calc_eating_score returns correct value when has_food is true' do
            @food_pair = @pairs[0]
            activity = @food_pair[:activity]
            expect(ComfortCalculation.calc_eating_score(activity, @invitee)).to eq(0.05)
        end

        it 'calc_eating_score returns correct value when has_food is true' do
            @no_food_pair = @pairs[1]
            activity = @no_food_pair[:activity]
            expect(ComfortCalculation.calc_eating_score(activity, @invitee)).to eq(0.00)
        end
        
    end

    describe 'calc_social_distance_score' do

        it 'calc_social_distance_score returns correct value when socialDistanceScore is greater than the importance of social distancing to the invitee' do
            @high_sd_score_pair = @pairs[5]
            activity = @high_sd_score_pair[:activity]
            expect(ComfortCalculation.calc_social_distance_score(activity, @invitee)).to eq(0.01)
        end

        it 'calc_social_distance_score returns correct value when socialDistanceScore is less than the importance of social distancing to the invitee' do
            @low_sd_score_pair = @pairs[1]
            activity = @low_sd_score_pair[:activity]
            expect(ComfortCalculation.calc_social_distance_score(activity, @invitee)).to eq(0.04)
        end

    end

    describe 'calc_num_attendees_score' do

        it 'calc_num_attendees_score returns correct value when the number of attendees is greater than the questionnaire response for the invitee' do
            num_attendees = 10
            expect(ComfortCalculation.calc_num_attendees_score(num_attendees, @invitee)).to eq(0.03)
        end

        it 'calc_num_attendees_score returns correct value when the number of attendees is less than the questionnaire response for the invitee' do
            num_attendees = 6
            expect(ComfortCalculation.calc_num_attendees_score(num_attendees, @invitee)).to eq(0.00)
        end
    end

    describe 'calc_mask_score' do

        it 'calc_mask_score returns correct value when no mask is required' do
            mask_required = false
            expect(ComfortCalculation.calc_mask_score(mask_required, @invitee)).to eq(0.02)
        end

        it 'calc_mask_score returns correct value when a mask is required' do
            mask_required = true
            expect(ComfortCalculation.calc_mask_score(mask_required, @invitee)).to eq(0.00)
        end

    end

    describe 'calc_pair_scores' do

        it 'calc_pair_scores returns value that is equivalent to the sum of the location, eating, and social distancing score of the pair' do

            @test_pair = @pairs[1]
            test_activity = @test_pair[:activity]
            test_location = @test_pair[:location]

            sd_score = ComfortCalculation.calc_social_distance_score(test_activity, @invitee)
            eating_score = ComfortCalculation.calc_eating_score(test_activity, @invitee)
            location_score = ComfortCalculation.calc_location_score(test_location, @invitee)
            expected_score = sd_score + eating_score + location_score

            expect(ComfortCalculation.calc_pair_scores(@test_pair, @invitee)).to eq(expected_score)

        end

        it 'calc_pair_scores returns correct value' do

            @test_pair = @pairs[1]
            expect(ComfortCalculation.calc_pair_scores(@test_pair, @invitee)).to eq(0.13)

        end

    end
end
