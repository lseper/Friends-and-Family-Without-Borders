class ApplicationController < ActionController::API

    QUESTIONNAIRE_TOTAL = 120.0

    # Individual comfort metric calculation
    def comfort_metric(questionnaire)
        answers = [questionnaire[:q1answer], questionnaire[:q2answer], questionnaire[:q3answer], questionnaire[:q4answer], questionnaire[:q5answer],
        questionnaire[:q6answer], questionnaire[:q7answer], questionnaire[:q8answer], questionnaire[:q9answer], questionnaire[:q10answer], questionnaire[:q11answer],
        questionnaire[:q12answer]]
        answers.sum / QUESTIONNAIRE_TOTAL
    end

    # ------------ Encryption and user authentication stuff ----------

    def encode(payload)
        JWT.encode(payload, 'test')
    end

    def auth_header
        request.headers['Authorization']
    end

    def decode_token
        if auth_header
            token = auth_header.split(' ')[1]
            begin
                JWT.decode(token, 'test', true, algorithm: 'HS256')
            rescue JWT::DecodeError
                nil
            end
        end
    end

    def logged_in_user
        decoded = decode_token
        if decoded
            @id = decoded[0]['user_id']
            @user = User.find_by(id: @id)
        end
    end

    def logged_in?
        !! logged_in_user
    end

    def authorized
        render json: { message: 'Please log in' }, status: :unauthorized unless logged_in?
    end

end
