class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]
  # before doing these actions, do authorized() first
  before_action :authorized, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all
    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end


  # logging in to an existing user (POST)
  def login
    # match to see if user exists based on username
    @user = User.where(username: params[:username]).first

    if @user
      # hash the password sent by the user to match with the one in the database
      if @user.authenticate(params[:password])
        token = encode( { user_id: @user.id } )
        render json: { auth_token: token, user_id: @user.id }
      else
        render json: { message: "password incorrect"}
      end
    else
      render json: { message: "username incorrect" }
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

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
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
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:username, :password, :phone, :name, :privacy)
    end
end