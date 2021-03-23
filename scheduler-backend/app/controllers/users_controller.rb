class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]
  # before doing these actions, do authorized() first
  before_action :authorized, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all
    render json: @users
  end

  # also return questionnaire comfort metric
  # (total responses) / (total max scores for each thing)
  # GET /users/1
  def show
    render json: profile_info(@user) 
  end


  # logging in to an existing user (POST)
  def login
    @user = User.where(username: params[:username]).first

    if @user
      # hash the password sent by the user to match with the one in the database
      if @user.authenticate(params[:password])
        token = encode( { user_id: @user.id } )
        render json: { auth_token: token, user_id: @user.id }
      else
        render json: { message: "password incorrect" }, status: 500
      end
    else
      render json: { message: "username incorrect" }, status: 500 
    end
  end

  # POST /users
  def create
    @user_exists = User.find_by(phone: params[:phone])

    if @user_exists
      render json: { message: "User with the phone already exists!" }, status: 500
    else
      @user = User.new(
        username: params[:username],
        password: params[:password],
        password_confirmation: params[:password], 
        phone: params[:phone],
        name: params[:name],
        privacy: params[:privacy]
      )

      if @user.save
        token = encode( { user_id: @user.id } )
        render json: { auth_token: token, user_id: @user.id }
      else
        render json: { message: "Some internal server error occurred. Review your information and attempt to submit again"}, status: 500
      end
    end
  end

  # only allow changing of username, name, and privacy setting
  # PATCH/PUT /users/1
  def update

    if @user.update_columns(username: params[:username], name: params[:name], privacy: params[:privacy])
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    def profile_info(user)
      # get the most recent questionnaire response
      user_questionnaire = get_questionnaire(user)
      {
        id: user.id,
        username: user.username,
        name: user.name,
        phone: user.phone,
        privacy: user.privacy,
        comfort_metric: comfort_metric(user_questionnaire)
      }
    end

    def get_questionnaire(user)
      user_questionnaire = Questionnaire.where(user_id: user.id).order(created_at: :desc)[0]
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:username, :password, :phone, :name, :privacy)
    end
end