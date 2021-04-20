# TODO: Move comfort score calculation into here, so that it isn't just tacked onto the base ApplicationController
module ComfortCalculation
    THRESHOLD = 0.8

    # calculate the score for this invitee based on location
    def calc_location_score(location, invitee)
        location_type = location[:location_type]
        base_location_score = 10
        questionnaire_location_score = 0
        if location_type == "Outside"
            questionnaire_location_score = invitee[:questionnaire][:q1answer]
        elsif location_type == "Large Inside"
            questionnaire_location_score = invitee[:questionnaire][:q2answer]
        elsif location_type == "Small Inside"
            questionnaire_location_score = invitee[:questionnaire][:q3answer]
        else
            questionnaire_location_score = invitee[:questionnaire][:q4answer]
        end
        location_score = (base_location_score - questionnaire_location_score) / 100.0
        return location_score
    end

    # calculate the score for this invitee based solely on the location-activity pair
    def calc_pair_scores(pair, invitee)
        location = pair[:location]
        activity = pair[:activity]

        location_score = calc_location_score(location, invitee) # 0.0 - 0.1
        eating_score = calc_eating_score(activity, invitee) # 0.0 - 0.1
        social_dist_score = calc_social_distance_score(activity, invitee) # 0.0 - 0.1
        return (location_score + eating_score + social_dist_score) # 0.0 - 0.3
    end

    # calculate the score for this invitee based on if food is present at this activity or not
    def calc_eating_score(activity, invitee)
        base_eating_score = 0
        if activity[:hasFood] == false
            return base_eating_score
        else
            base_eating_score = 10
            questionnaire_eating_score = invitee[:questionnaire][:q5answer]
            eating_score = (base_eating_score - questionnaire_eating_score) / 100.0
            return eating_score
        end
    end

    # calculate the score for this invitee given the amount of social distancing at this event
    def calc_social_distance_score(activity, invitee)
        base_social_score = activity[:socialDistanceScore].to_i
        questionnaire_social_score = invitee[:questionnaire][:q6answer].to_i

        social_score = questionnaire_social_score - base_social_score

        # if they have a preference for less socially distanced things, only halve this difference (not as important)
        if social_score <= 0
            social_score = social_score.abs() * 0.5 
        end

        return social_score / 100.0
    end

    # calculate the score for this invitee given the total amount of people at this event
    def calc_num_attendees_score(num_attendees, invitee)
        questionnaire_num_attendees_comfort = invitee[:questionnaire][:q7answer]
        num_attendees_score = num_attendees - questionnaire_num_attendees_comfort

        if num_attendees_score <= 0
            return 0
        else
            return num_attendees_score / 100.0
        end
    end

    # calculate the score for this invitee given the fact that masks are required or not
    def calc_mask_score(mask_required, invitee)
      
        if !mask_required
            questionnaire_mask_score = invitee[:questionnaire][:q8answer]
            return (10 - questionnaire_mask_score) / 100.0
        else
            return 0
        end
    end

    def calc_comfort_scores_for_all_invitees(invitees, event)
        # TODO: Need to only have people that have filled out questionnaires be able to be invited!
        # get all pairs
        pairs = LocationActivitySuggestion.all
        pairs = setup_pairs(pairs)
        # TODO: match each user up with each potential pairing
        for invitee in invitees
            # how comfortable are you with the number of attendees at the event?
            num_attendees_score = calc_num_attendees_score(invitees.length, invitee)
            # how comfortable are you with the mask requirement at the event?
            mask_score = calc_mask_score(event[:masks_required], invitee)
            for pair in pairs
                pair_score = calc_pair_scores(pair, invitee)
                # aggregate all of those metrics into one metric. The higher this score = more comfortable you are with this pair
                total_suggestion_comfort = 1 - pair_score - num_attendees_score - mask_score
                # add this score to the invitee object
                invitee[:matches].append(total_suggestion_comfort)

                # see if this invitee is comfortable enough to attend this event
                if total_suggestion_comfort >= THRESHOLD
                    if invitee[:priority]
                        pair[:priority_passed] += 1
                    else
                        pair[:others_passed] += 1
                    end
                end
                # update the overall average comfort metric for this location-activity pair
                pair[:average_comfort] += (total_suggestion_comfort / invitees.length)

            end
        end
        
        pairs = pairs.sort_by{|p| [p[:priority_passed], p[:others_passed], p[:average_comfort]]}.reverse![0,5]

        return pairs
    end
end