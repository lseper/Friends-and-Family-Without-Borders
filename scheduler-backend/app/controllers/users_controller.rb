class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]
  # before doing these actions, do authorized() first
  before_action :authorized, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all
    users = []
    for user in @users
      if get_questionnaire(user) != 0
        users.append(profile_info(user))
      # else
      #   users.append(user)
      end
    end
    render json: users
  end

  # also return questionnaire comfort metric
  # (total responses) / (total max scores for each thing)
  # GET /users/1
  def show
    render json: profile_info(@user) 
  end


  # logging in to an existing user (POST)
  # Tell Front-End they can access the json body in the error via err.response
  def login
    @user = User.find_by(username: params[:username])

    if @user
      # hash the password sent by the user to match with the one in the database
      if @user.authenticate(params[:password])
        token = encode( { user_id: @user.id } )
        has_filled_out_questionnaire = true
        if get_questionnaire(@user) == 0
          has_filled_out_questionnaire = false
        end
        render json: { auth_token: token, user_id: @user.id, filled_out: has_filled_out_questionnaire }
      else
        render json: { message: "password incorrect" }, status: :unprocessable_entity # Unprocessable Entity (good for faulty usernames / passwords)
      end
    else
      render json: { message: "username incorrect" }, status: :unprocessable_entity 
    end
  end

  # POST /users
  def create
    @user_exists = User.find_by(email: params[:email])

    if @user_exists
      render json: { message: "User with the email already exists!" }, status: :unprocessable_entity
    else
      @user = User.new(
        username: params[:username],
        password: params[:password],
        password_confirmation: params[:password], 
        email: params[:email],
        privacy: params[:privacy]
      )

      if @user.save
        token = encode( { user_id: @user.id } )
        render json: { auth_token: token, user_id: @user.id }
      else
        render json: { message: "Some internal server error occurred. Review your information and attempt to submit again"}, status: :unprocessable_entity
      end
    end
  end

# only allow changing of username, name, password, and privacy setting
  # PATCH/PUT /users/1
  def update
    if @user.update(username: params[:username], 
      privacy: params[:privacy])
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  # PUT /reset_password
  def reset_password
    @user = User.find_by(username: params[:username])
    if @user
    # check if email matches
      if @user.email == params[:email]
        # password resetting
        @user.password = params[:new_password]
        @user.password_confirmation = params[:new_password]
        if @user.save()
          render json: { message: "Successfully reset password for #{params[:username]}!"}, status: :ok
        else
          render json: {message: "Something is wrong with the password you sent us!"}, status: :unprocessable_entity
        end
      else
        render json: { message: "You must input the correct email to reset the password for this user!"}, status: :unauthorized
      end
    else
      render json: { message: "The user with the username you sent us does not exist!"}, status: :unprocessable_entity
    end
  end

  private
    def profile_info(user)
      # get the most recent questionnaire response
      {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        privacy: user.privacy,
      }
    end

    def get_questionnaire(user)
      user_questionnaires = Questionnaire.where(user_id: user.id).order(created_at: :desc)
      if user_questionnaires.length() == 0
        return 0;
      else
        return user_questionnaires[0]
      end
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:username, :password, :email, :name, :privacy)
    end
end