class UsersController < ApplicationController
  def new
    @home_page = true
  end
  
  def create
    @user = User.new(user_params)
    if @user.save
      sign_in!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end  
  
  def index
    if signed_in?
      redirect_to root_url
    else
      redirect_to new_user_url
    end
  end
  
  def show
    @user = User.find(params[:id])
    render json: @user
  end
  
  private
  def user_params
    params.require(:user).permit(:username, :password, :location, :bio)
  end
end